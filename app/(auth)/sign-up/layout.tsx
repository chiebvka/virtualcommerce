import Footer from "@/app/(routes)/_components/Footer";
import Header from "@/app/(routes)/_components/Header";



export default function HomeLayout({
    children,
  }: {
   children: React.ReactNode;
  }) {
    return (
        <>
        <Header />
            <main className="min-h-screen flex items-center justify-center mx-auto">
                {children}
            </main>
        <Footer />
        </>
    )
  }