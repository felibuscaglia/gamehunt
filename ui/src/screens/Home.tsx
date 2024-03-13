import PageHead from "components/PageHead";
import TrendingSection from "components/TrendingSection";

const HomeScreen = () => {
  return (
    <main>
      <PageHead />
      <section className="w-10/12 mx-auto">
        <TrendingSection />
      </section>
    </main>
  );
};

export default HomeScreen;
