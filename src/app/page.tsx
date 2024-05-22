
import DashboardCards from "@/components/DashboardCards";
import DashboardTable from "@/components/DashboardTable";
import WelcomeText from "@/components/welcomeText";


const page = () => {
  return (
    <section className="max-container">
      <WelcomeText />
      <DashboardCards />
      <DashboardTable />
      
    </section>
  );
};

export default page;
