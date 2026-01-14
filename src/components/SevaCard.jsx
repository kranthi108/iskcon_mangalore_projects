export default function SevaCard({
  image,
  title,
  total,
  minimum,
  slots = []
}) {
  return (
    <div className="seva-box seva-split">

      {/* Left – Image */}
      <div className="seva-image-container">
        <img src={image} alt={title} />
      </div>

      {/* Right – Content */}
      <div className="seva-content">
        <h3>{title}</h3>
        <p>
          Total Seva: <span className="amount">{total}</span>
        </p>
        <p>Minimum Seva: {minimum}</p>

        <div className="slot-list">
          {slots.map((slot, index) => (
            <div key={index} className="slot">
              {slot}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
