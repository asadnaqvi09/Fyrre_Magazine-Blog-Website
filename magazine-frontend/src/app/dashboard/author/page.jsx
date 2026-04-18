import AuthorStats from "@/components/dashboard/author/home/AuthorStats";
import RecentSubmissions from "@/components/dashboard/author/home/RecentSubmissions";

export default function AuthorDashboard({title = "Author Home"}) {
    return (
        <>
        <section className="flex flex-col gap-10" title={title}>
            <AuthorStats />
            <RecentSubmissions />
        </section>
        </>
    )
}