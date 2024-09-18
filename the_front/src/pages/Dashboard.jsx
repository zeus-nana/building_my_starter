import Row from "../ui/Row.jsx";
import Heading from "../ui/Heading.jsx";
import DashboardLayout from "../features/dashboard/DashboardLayout.jsx";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tableau de bord</Heading>
        <p>Diagram</p>
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
