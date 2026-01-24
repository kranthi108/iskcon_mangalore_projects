import "../App.css";
import SevaCard from "../components/SevaCard";

import front_view from "../assets/001_temple_front_view.jpeg";
import annadana from "../assets/nityaannadana.jpg";
import utsava from "../assets/pravachan.jpg";
import garbha from "../assets/garbhagriha.jpg";
import dwaja from "../assets/dwajastambha.jpg";

export default function Home() {
  return (
    <div className="app">
      {/* HEADER */}
      <header>
        <h1>Temple Cultural Centre Project</h1>
        <p>Seva Opportunities & Construction Plan</p>
      </header>

      {/* SEVA SECTION */}
      <section>
        <h2>🙏 Major Seva Opportunities</h2>

        <SevaCard
          image={front_view}
          title="Mukhya Mandira Seva"
          total="₹10.7 Crores"
          minimum="₹5,55,555"
          slots={["25 Slots", "₹25 Lakh – 10 Slots"]}
        />

        <SevaCard
          image={annadana}
          title="Annadana Hall"
          total="₹3.65 Crores"
          minimum="₹2,55,555"
          slots={[
            "50 Slots",
            "₹5,55,555 – 25 Slots",
            "₹25 Lakh – 4 Slots"
          ]}
        />

        <SevaCard
          image={utsava}
          title="Utsava Vedika / Pravachan Hall"
          total="₹5 Crores"
          minimum="₹1,08,000"
          slots={[
            "240 Slots",
            "₹5,55,555 – 30 Slots",
            "₹25 Lakh – 3 Slots"
          ]}
        />

        <SevaCard
          image={garbha}
          title="Garbhagriha Seva"
          total="₹50 Lakhs"
          minimum="₹10,55,555"
          slots={["5 Slots"]}
        />

        <SevaCard
          image={dwaja}
          title="Dwajasthambha Seva"
          total="₹55.55 Lakhs"
          minimum="₹5,55,555"
          slots={["10 Slots"]}
        />
      </section>

      {/* PROJECT BLOCKS */}
      <section>
        <h2>🏛 Project Blocks</h2>
        <table>
          <tr>
            <th>Block</th>
            <th>Purpose</th>
            <th>Built-up Area (sft)</th>
            <th>Total Cost (₹)</th>
            <th>Cost / sft</th>
          </tr>

          <tr>
            <td>Main Cultural Centre</td>
            <td>Temple Hall, Kitchen, Dining, Vedika, Gallery</td>
            <td>47,233</td>
            <td className="amount">23.35 Crores</td>
            <td>₹4,948 – ₹5,427</td>
          </tr>

          <tr>
            <td>Full-time Volunteers Block</td>
            <td>Sadhu Nivas, Vaishnava Nivas, Ashrama</td>
            <td>15,065</td>
            <td className="amount">4.25 Crores</td>
            <td>₹1,203 – ₹3,929</td>
          </tr>

          <tr>
            <td>Residential Volunteers</td>
            <td>Sevak & Bhakta Nivas</td>
            <td>13,102</td>
            <td className="amount">4.60 Crores</td>
            <td>₹3,511</td>
          </tr>

          <tr>
            <td>Yoga Centre & Annadana Hall</td>
            <td>Yoga, Cultural Study, Dining</td>
            <td>48,566</td>
            <td className="amount">17.00 Crores</td>
            <td>₹3,331 – ₹3,831</td>
          </tr>

          <tr className="highlight">
            <td>Yatri Nivas – 1</td>
            <td>Guest Accommodation</td>
            <td>16,361</td>
            <td className="amount">5.45 Crores</td>
            <td>₹3,331</td>
          </tr>

          <tr className="highlight">
            <td>Yatri Nivas – 2</td>
            <td>Guest Accommodation</td>
            <td>36,639</td>
            <td className="amount">13.00 Crores</td>
            <td>₹3,548</td>
          </tr>

          <tr>
            <td>Goshala</td>
            <td>Cow Protection</td>
            <td>1,020</td>
            <td className="amount">₹20 Lakhs</td>
            <td>₹1,961</td>
          </tr>
        </table>
      </section>

      {/* YATRI NIVAS */}
      <section>
        <h2>🏨 Yatri Nivas Sponsorship</h2>

        <table>
          <tr>
            <th>Building</th>
            <th>Total Cost</th>
            <th>Minimum Seva</th>
            <th>Available Slots</th>
          </tr>

          <tr className="highlight">
            <td>Yatri Nivas – 1</td>
            <td className="amount">₹5.45 Crores</td>
            <td>₹1,08,000</td>
            <td>545 Slots</td>
          </tr>

          <tr className="highlight">
            <td>Yatri Nivas – 2</td>
            <td className="amount">₹13 Crores</td>
            <td>₹5,55,555</td>
            <td>260 Slots</td>
          </tr>
        </table>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© Temple Cultural Centre – All donations are used for spiritual and community development</p>
      </footer>
    </div>
  );
}
