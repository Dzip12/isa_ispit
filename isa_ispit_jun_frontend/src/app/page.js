"use client";

import {useEffect, useState} from "react";
import {Button, Spinner} from "reactstrap";
import {get, post, put} from "@/core/httpClient";
import {useAuth} from "@/contexts/authContext";
import styles from "./page.module.css";

export default function Home() {
  const {user} = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      const response = await get("/product/get-list");
      setProducts(response.data);
      setLoading(false);
    };

    loadProducts();
  }, []);

  useEffect(() => {
    setCart([]);
    setOrder(null);
    setMessage("");
  }, [user?.id]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setMessage("");
  }

  const totalAmount = cart.reduce((total, product) => total + Number(product.price), 0);

  const createOrder = async () => {
    if (!user) {
      setMessage("Morate biti ulogovani da biste kupili proizvode.");
      return;
    }

    if (cart.length === 0) {
      setMessage("Korpa je prazna.");
      return;
    }

    if (order?.status === "PENDING") {
      setMessage("Vec imate porudzbinu u statusu PENDING. Platite je pre nove kupovine.");
      return;
    }

    const response = await post("/order/create", {
      userId: user.id,
      totalAmount: totalAmount
    });

    setOrder(response.data);
    setMessage("Porudzbina je kreirana i trenutno je u statusu PENDING.");
  }

  const payOrder = async () => {
    const response = await put(`/order/pay/${order.id}`);

    setOrder(response);
    setCart([]);
    setMessage("Porudzbina je placena.");
  }

  return (
    <section className={styles.page}>
      <div className={styles.heading}>
        <h1>Proizvodi</h1>
        <p>Pregled proizvoda iz baze prodavnica.</p>
      </div>

      {loading && (
        <div className={styles.loading}>
          <Spinner color="primary">Ucitavanje...</Spinner>
        </div>
      )}

      {!loading && (
        <>
          <div className={styles.cart}>
            <h5>Korpa</h5>
            <p>Broj proizvoda: {cart.length}</p>
            <p>Ukupno: {totalAmount.toFixed(2)} RSD</p>

            {message && <div className="alert alert-info">{message}</div>}

            {order && (
              <p>Status porudzbine: <strong>{order.status}</strong></p>
            )}

            <Button color="success" className="me-2" onClick={createOrder}>Kupi</Button>
            {order?.status === "PENDING" && (
              <Button color="primary" onClick={payOrder}>Plati</Button>
            )}
          </div>

          <div className={styles.products}>
            {products.map((product) => (
              <div className={styles.card} key={product.id}>
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className={styles.image} />
                ) : (
                  <div className={styles.noImage}>Nema slike</div>
                )}

                <div className={styles.cardBody}>
                  <h5>{product.name}</h5>
                  <p>Velicina: {product.size}</p>
                  <div className={styles.productActions}>
                    <strong>{product.price} RSD</strong>
                    <Button color="primary" size="sm" onClick={() => addToCart(product)}>
                      Dodaj u korpu
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
