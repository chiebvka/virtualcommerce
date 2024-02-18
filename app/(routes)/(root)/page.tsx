import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "../_components/Hero";
import Promo from "../_components/Promo";
import ProductCard from "../_components/ProductCard";
import Calls from "../_components/Calls";

export default function Home() {
  return (
    <main>
      <Hero />
      <Promo />
      <ProductCard headings="Popular Products" link="store" />
      <Calls />
      <ProductCard headings="New Products" link="Arrivals" />

    </main>
  );
}
