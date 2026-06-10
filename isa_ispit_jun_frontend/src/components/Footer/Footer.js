export default function Footer() {
    return (
    <footer className="mt-5 pt-4 border-top text-muted">
        <div className="row">
            <div className="col-md-6 mb-3">
                <h6 className="text-dark">Prodavnica ISA</h6>
                <p className="mb-0">
                    Projekat za predmet Internet softverske arhitekture.
                </p>
            </div>

            <div className="col-md-3 mb-3">
                <h6 className="text-dark">Funkcionalnosti</h6>
                <p className="mb-1">Korisnici</p>
                <p className="mb-1">Proizvodi</p>
                <p className="mb-0">Narudzbine</p>
            </div>

            <div className="col-md-3 mb-3 text-md-end">
                <h6 className="text-dark">Tehnologije</h6>
                <p className="mb-1">Spring Boot REST API</p>
                <p className="mb-0">Next.js frontend</p>
            </div>
        </div>

        <div className="py-3 border-top small">
            © {new Date().getFullYear()}Prodavnica ISA
        </div>
    </footer>
    )
}