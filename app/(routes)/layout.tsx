import Footer from "./_components/Footer";
import Header from "./_components/Header";


export default function HomeLayout({
    children,
  }: {
   children: React.ReactNode;
  }) {
    return (
        <>
        <Header/>
            <main className="min-h-screen mx-auto">
                {children}
            </main>
        <Footer />
        </>
    )
  }