import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE VIEW vw_transaction_agrege AS
    SELECT 
        categorie,
        sous_categorie,
        statut_operation AS statut,
        responsable,
        partenaire,
        application,
        DATE(date_operation) AS date_operation,
        reference,
        SUM(montant) AS montant,
        SUM(frais_ttc) AS frais_ttc,
        SUM(frais_ht) AS frais_ht,
        SUM(tva) AS tva,
        SUM(commission) AS commission,
        code_agence AS code,
        agence,
        v_hv,
        region,
        departement,
        commune
    FROM 
        transaction
    GROUP BY 
        categorie,
        sous_categorie,
        statut_operation,
        responsable,
        partenaire,
        application,
        DATE(date_operation),
        reference,
        code_agence,
        agence,
        v_hv,
        region,
        departement,
        commune;
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP VIEW IF EXISTS vw_transaction_agrege;`);
}
