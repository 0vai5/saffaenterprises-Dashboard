import DashboardCards from "@/components/DashboardCards";
import Header from "@/components/Header";

const page = () => {
  return (
    <>
      <Header />
      <section className="max-container">
        <DashboardCards />
      </section>
    </>
  );
};

export default page;
