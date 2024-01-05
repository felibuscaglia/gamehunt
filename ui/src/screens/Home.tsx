import PageHead from "components/PageHead";
import TrendingTopics from "components/TrendingTopics";

const HomeScreen = () => {
    return (
        <main>
            <PageHead />
            <section>
                <TrendingTopics />
            </section>
        </main>
    )
}

export default HomeScreen;