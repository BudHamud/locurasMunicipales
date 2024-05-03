import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "About Us" },
    { name: "description", content: "Learn about our company mission, history, and values." },
  ];
};

export default function AboutUsPage() {
  return (
    <main>
      <h1>About Us</h1>

      <section>
        <h2>Our Mission</h2>
         <p>We strive to empower businesses with innovative solutions that ... </p>
      </section>

      <section>
        <h2>Our Story</h2>
        <p>Our company was founded in 20XX, inspired by... </p>
      </section>

      {/* More sections (Values, Team, etc.) */}
      
      <section>
        <h2>Get in Touch</h2>
        <p>Have questions or want to collaborate? Reach out to us at <a href="mailto:info@yourcompany.com">info@yourcompany.com</a></p>
      </section>
    </main>
  );
}