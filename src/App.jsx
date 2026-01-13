import "./App.css";

export default function App() {
  return (
    <div className="app">

      <header>
      <h1>Temple Cultural Centre Project</h1>
      <p>Seva Opportunities & Construction Plan</p>
      </header>
 <section>
      <h2>🙏 Major Seva Opportunities</h2>

      <div className="seva-box">
      <h3>Mukhya Mandira Bhavan</h3>
      <p>Total Seva: <span className="amount">₹10.7 Crores</span></p>
      <p>Minimum Seva: ₹5,55,555</p>
      <p>
      <span className="slot">100 Slots</span>
      <p>
      <span className="slot"> 10,55,555 - 25 Slots </span>
      </p>
      <span className="slot">₹25 Lakh – 10 Slots</span>
      </p>
      </div>

      <div className="seva-box">
      <h3>Annadana Hall</h3>
      <p>Total Seva: <span className="amount">₹3.65 Crores</span></p>
      <p>Minimum Seva: ₹2,55,555</p>
      <p>
                  <span className="slot">50 Slots</span>
                  <p>
                  <span className="slot"> 5,55,555 - 25 Slots </span>
                  </p>
                  <span className="slot">₹25 Lakh – 4 Slots</span>
                  </p>
      </div>

      <div className="seva-box">
      <h3>Utsava Vedika / Pravachan Hall</h3>
      <p>Total Seva: <span className="amount">₹5 Crores</span></p>
      <p>Minimum Seva: ₹1,08,000</p>
      <p>
            <span className="slot">240 Slots</span>
            <p>
            <span className="slot"> 5,55,555 - 30 Slots </span>
            </p>
            <span className="slot">₹25 Lakh – 3 Slots</span>
            </p>

      </div>

      <div className="seva-box">
      <h3>Garbhagriha Seva</h3>
      <p>Total Seva: <span className="amount">₹50 Lakhs</span></p>
      <p>Minimum Seva: ₹10,55,555</p>
      <p><span className="slot">5 Slots</span></p>
      </div>

      <div className="seva-box">
      <h3>Dwajasthambha Seva</h3>
      <p>Total Seva: <span className="amount">₹55.55 Lakhs</span></p>
      <p>Minimum Seva: ₹5,55,555</p>
      <p><span className="slot">10 Slots</span></p>
      </div>
</section>
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

      <footer>
      <p>© Temple Cultural Centre – All donations are used for spiritual and community development</p>
      </footer>

</div>
  );
}
