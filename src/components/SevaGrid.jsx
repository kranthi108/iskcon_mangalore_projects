import './SevaGrid.css';
import goshalaImage from '../assets/nityaannadana.jpg';
import annadanaImage from '../assets/nityaannadana.jpg';
import dwajastambhaImage from '../assets/dwajastambha.jpg';
import dwaraImage from '../assets/garbhagriha.jpg';

const sevaData = [
  {
    id: 1,
    title: 'Goshala Seva',
    bannerColor: 'purple',
    image: goshalaImage,
    sanskrit: 'namo brahmanya-devāya go-brāhmaņa-hitāya ca jagad-dhitāya kṛṣṇāya govindāya namo namah',
    translation: 'My Lord, You are the well-wisher of the cows and the brahmanas, and You are the well-wisher of the entire human society and world.',
    source: 'Vişnu Purana 1.19.65',
    sevaName: 'Goshala Seva',
    amount: 'INR 1,08,000',
    slots: '10'
  },
  {
    id: 2,
    title: 'Annadana Hall Seva',
    bannerColor: 'green',
    image: annadanaImage,
    sanskrit: 'Gajaturaga Sahasram Gokulam kotidanam Kanaka Rajathapatram Methinisagarantham Upayakula vishuttam Kotikanyapradanam Nahi nahi bahudanam Annadanam samanam',
    translation: 'Donating 1000 elephants & horses, donating 10 million cows, donating any number of vessels of silver and gold, donating the entire land till sea, offering the entire services of the clan, helping in the marriage of 10 million women, all this is never ever equal to Annadanam, the feeding of hungry and needy.',
    source: '',
    sevaName: 'Annadana Hall Seva',
    amount: 'INR 1,08,000',
    slots: '365'
  },
  {
    id: 3,
    title: 'Dwajastambha Seva',
    bannerColor: 'blue',
    image: dwajastambhaImage,
    sanskrit: '',
    translation: 'On building a temple of Sri Madhava, one can attain the eternal Vaikuntha-loka',
    source: 'Narasimha Purana',
    sevaName: 'Dwajastambha Seva',
    amount: 'INR 1,08,000',
    slots: '365'
  },
  {
    id: 4,
    title: 'Dwara Seva',
    bannerColor: 'orange',
    image: dwaraImage,
    sanskrit: '',
    translation: 'On building a temple of Sri Madhava, one can attain the eternal Vaikuntha-loka',
    source: 'Narasimha Purana',
    sevaName: 'Dwara Seva',
    amount: 'INR 1,08,000',
    slots: '365'
  }
];

export default function SevaGrid() {
  return (
    <section className="seva-grid-section">
      <div className="seva-grid">
        {sevaData.map((seva) => (
          <div key={seva.id} className="seva-card">
            <div 
              className={`seva-banner seva-banner-${seva.bannerColor}`}
            >
              <h3>{seva.title}</h3>
            </div>
            <div className="seva-background">
              <div 
                className="seva-background-image"
                style={{ backgroundImage: `url(${seva.image})` }}
              ></div>
              <div className="seva-content">
                {seva.sanskrit && (
                  <div className="seva-sanskrit">
                    <p>{seva.sanskrit}</p>
                  </div>
                )}
                <div className="seva-translation">
                  <p>"{seva.translation}"</p>
                  {seva.source && <p className="seva-source">— {seva.source}</p>}
                </div>
                <div className={`seva-info-box seva-info-${seva.bannerColor}`}>
                  <p className="seva-info-name">{seva.sevaName}</p>
                  <p className="seva-info-amount">{seva.amount}</p>
                  <p className="seva-info-slots">No. of Slots - {seva.slots}</p>
                </div>
                <button className="seva-donate-btn">DONATE NOW</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
