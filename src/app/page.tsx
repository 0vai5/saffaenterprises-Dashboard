
import DashboardCards from "@/components/DashboardCards";
import DashboardTable from "@/components/DashboardTable";


const page = () => {
  return (
    <section className="max-container">
      <DashboardCards />
      <DashboardTable />
    </section>
  );
};

export default page;
