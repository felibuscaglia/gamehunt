import PageHead from "components/PageHead";
import TrendingTopics from "components/TrendingTopics";

const HomeScreen = () => {
    return (
        <main>
            <PageHead />
            <section className="w-10/12 mx-auto">
                <TrendingTopics />
            </section>
        </main>
    )
}

export default HomeScreen;