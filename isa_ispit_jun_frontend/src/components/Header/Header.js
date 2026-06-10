"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import {Button} from "reactstrap";
import {useAuth} from "@/contexts/authContext";

export default function Header() {
    const {user, logout, hasRole} = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/");
    }

    return(
    <header className="mb-4">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between py-3 border-bottom">
            <Link href="/" className="text-dark text-decoration-none">
                <span className="fs-4 fw-semibold">Prodavnica ISA</span>
            </Link>

            <nav className="d-flex align-items-center gap-3 mt-3 mt-md-0">
                {user && hasRole("admin") && (
                    <>
                        <Link href="/user/list" className="text-dark text-decoration-none">Korisnici</Link>
                        <Link href="/user/create" className="text-dark text-decoration-none">Dodaj korisnika</Link>
                    </>
                )}

                {!user && (
                    <>
                        <Link href="/login" className="text-dark text-decoration-none">Login</Link>
                        <Link href="/signup" className="text-dark text-decoration-none">Signup</Link>
                    </>
                )}

                {user && (
                    <>
                        <span className="text-muted">{user.firstName} {user.lastName}</span>
                        <Button color="outline-secondary" size="sm" onClick={handleLogout}>Logout</Button>
                    </>
                )}
            </nav>
        </div>
    </header>
    )
}