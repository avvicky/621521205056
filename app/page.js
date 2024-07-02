"use client";
//functunality imports
import { useState } from "react";

//Component's import
import ProductCard from "./_components/ProductCard";

export default function Home() {
  const [token, setToken] = useState({});
  const [data, setData] = useState([]);

  const postData = {
    companyName: "Mahendra",
    clientID: "aeb3dab9-fe61-4baa-bcd1-42feee410d99",
    clientSecret: "qzIejLfiDmHrnbrl",
    ownerName: "vignesh A",
    ownerEmail: "avvickya@gmail.com",
    rollNO: "621521205056",
  };

  const fetchToken = async () => {
    try {
      const tokenResponse = await fetch("https://20.244.56.144/test/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: postData,
      });

      if (!tokenResponse.ok) {
        throw new Error(`Error: ${tokenResponse.status}`);
      }

      const tokenData = await tokenResponse.json();
      setToken(tokenData);
      console.log(tokenData);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    if (token && token.expires_in) {
      const timeoutId = setTimeout(fetchToken, token.expires_in * 1000);
      return () => clearTimeout(timeoutId); // Cleanup on unmount
    }
  }, [token]);

  const fetchData = async () => {
    const response = await fetch(
      "https://20.244.56.144/test/companies/AMZ/categories/Computer/products?top=10&minPrice=1&maxPrice=100000",
      {
        headers: {
          Authorization: "Bearer " + token.access_token,
        },
      }
    );
    const responseData = await response.json();
    setData(responseData);
  };

  fetchData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div>
      <h1>Filters</h1>
      
    </div>
      {data.map((item) => {
        <div className="flex min-h-10 min-w-10 flex row items-center justify-between p-6">
          <h1>{item.productName}</h1>
          <div>
            <p>{item.price}</p>
            <p>{item.rating}</p>
          </div>
          <p>{item.discount}</p>
        </div>;
      })}
    </main>
  );
}
