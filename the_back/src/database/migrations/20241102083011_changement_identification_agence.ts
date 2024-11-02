import { Knex } from 'knex';
import { onUpdateTrigger } from '../../../knexfile';

export async function up(knex: Knex): Promise<void> {
  const MIGRATION_USER_ID = 1309;

  // 1. Créer la table correspondance_partenaire
  await knex.schema.createTable('correspondance_partenaire', (table) => {
    table.increments('id').primary();
    table.string('partenaire', 100).notNullable().unique();
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);
  });
  await knex.raw(onUpdateTrigger('correspondance_partenaire'));

  // 2. Créer la table de liaison agence_correspondance
  await knex.schema.createTable('agence_correspondance', (table) => {
    table.increments('id').primary();
    table.integer('agence_id').unsigned().references('id').inTable('agence').onDelete('CASCADE');
    table
      .integer('correspondance_id')
      .unsigned()
      .references('id')
      .inTable('correspondance_partenaire')
      .onDelete('CASCADE');
    table.string('identifiant', 255).notNullable();
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.integer('updated_by').unsigned().references('id').inTable('users');
    table.timestamps(true, true);

    // Seule contrainte d'unicité : un identifiant doit être unique par partenaire
    table.unique(['correspondance_id', 'identifiant'], 'unique_identifiant_par_partenaire');

    // Index pour optimiser les recherches
    table.index(['agence_id', 'correspondance_id']);
  });
  await knex.raw(onUpdateTrigger('agence_correspondance'));

  // 3. Migration des données existantes
  const idColumns = [
    { column: 'id_lmt_om', partenaire: 'LMT OM' },
    { column: 'id_avs_momo', partenaire: 'AVS MOMO' },
    { column: 'id_gs_momo', partenaire: 'GS MOMO' },
    { column: 'id_gs_om', partenaire: 'GS OM' },
    { column: 'id_avs_wafacash', partenaire: 'AVS WAFACASH' },
    { column: 'id_bacm', partenaire: 'BACM' },
    { column: 'id_intouch', partenaire: 'INTOUCH' },
    { column: 'id_sce_wafacash', partenaire: 'SCE WAFACASH' },
    { column: 'id_western_ecobank', partenaire: 'WESTERN ECOBANK' },
    { column: 'id_afrik_com_wafacash', partenaire: 'AFRIK COM WAFACASH' },
    { column: 'id_western_emi', partenaire: 'WESTERN EMI' },
    { column: 'id_hop_international', partenaire: 'HOP INTERNATIONAL' },
    { column: 'id_emi_ecobank', partenaire: 'EMI ECOBANK' },
    { column: 'id_uba', partenaire: 'UBA' },
    { column: 'id_ria', partenaire: 'RIA' },
    { column: 'id_axa', partenaire: 'AXA' },
  ];

  // Insérer les partenaires
  for (const { partenaire } of idColumns) {
    await knex('correspondance_partenaire').insert({
      partenaire,
      created_by: MIGRATION_USER_ID,
      updated_by: MIGRATION_USER_ID,
    });
  }

  // Migration des données pour chaque agence
  const agences = await knex('agence').select('*');

  for (const agence of agences) {
    for (const { column, partenaire } of idColumns) {
      if (agence[column]) {
        const [correspondance] = await knex('correspondance_partenaire').where('partenaire', partenaire).select('id');

        if (correspondance) {
          // console.log(agence);

          await knex('agence_correspondance').insert({
            agence_id: agence.id,
            correspondance_id: correspondance.id,
            identifiant: agence[column],
            created_by: MIGRATION_USER_ID,
            updated_by: MIGRATION_USER_ID,
          });
        }
      }
    }
  }

  // D'abord on supprime la vue existante
  await knex.raw('DROP VIEW IF EXISTS vw_agence_localite');
  // 4. Supprimer les anciennes colonnes
  await knex.schema.alterTable('agence', (table) => {
    idColumns.forEach(({ column }) => {
      table.dropColumn(column);
    });
  });
}

export async function down(knex: Knex): Promise<void> {
  // 1. Recréer les colonnes dans la table agence
  await knex.schema.alterTable('agence', (table) => {
    [
      'id_lmt_om',
      'id_avs_momo',
      'id_gs_momo',
      'id_gs_om',
      'id_avs_wafacash',
      'id_bacm',
      'id_intouch',
      'id_sce_wafacash',
      'id_western_ecobank',
      'id_afrik_com_wafacash',
      'id_western_emi',
      'id_hop_international',
      'id_emi_ecobank',
      'id_uba',
      'id_ria',
      'id_axa',
    ].forEach((column) => {
      table.string(column, 255);
    });
  });

  // 2. Restaurer les données
  const correspondances = await knex('agence_correspondance')
    .select('*')
    .join('correspondance_partenaire', 'correspondance_partenaire.id', '=', 'agence_correspondance.correspondance_id');

  for (const corr of correspondances) {
    const columnName = `id_${corr.partenaire.toLowerCase().replace(/ /g, '_')}`;
    await knex('agence')
      .where('id', corr.agence_id)
      .update({
        [columnName]: corr.identifiant,
      });
  }

  // 3. Supprimer les tables dans l'ordre inverse
  await knex.schema.dropTableIfExists('agence_correspondance');
  await knex.schema.dropTableIfExists('correspondance_partenaire');

  await knex.raw(`
    CREATE OR REPLACE VIEW vw_agence_localite AS
    SELECT 
      a.id,
      ca.commune,
      ca.arrondissement,
      d.departement,
      r.region,
      r.chef_lieu
    FROM 
      agence a
    LEFT JOIN 
      commune_arrondissement ca ON a.commune_id = ca.id
    LEFT JOIN 
      departement d ON ca.departement_id = d.id
    LEFT JOIN 
      region r ON d.region_id = r.id
  `);
}
