import styled from "styled-components";
import Stats from "./Stats.jsx";
import CommissionsChart from "./CommissionsChart.jsx";
import PropTypes from "prop-types";
import CommissionPartenaire from "./CommissionPartenaire.jsx";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 0.8fr 0.8fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout({ data }) {
  return (
    <StyledDashboardLayout>
      <Stats commission_total={data.commission_total} />
      <div></div>
      <CommissionsChart data={data} />
      <CommissionPartenaire data={data} />
    </StyledDashboardLayout>
  );
}

DashboardLayout.propTypes = {
  data: PropTypes.shape({
    commission_total: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    commission_par_jour: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        commission: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default DashboardLayout;
