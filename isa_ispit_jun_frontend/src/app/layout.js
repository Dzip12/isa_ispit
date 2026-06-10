'use client'
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import {ListActionProvider} from "@/contexts/listActionContext";
import {AuthProvider} from "@/contexts/authContext";


export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body>
            <div className="container py-3">
                <AuthProvider>
                    <Header />
                    <main>
                        <ListActionProvider>
                            {children}
                        </ListActionProvider>
                    </main>
                </AuthProvider>
                <Footer />
            </div>
            </body>
        </html>
    )
}