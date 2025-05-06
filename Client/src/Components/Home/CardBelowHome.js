import React from 'react';
import HomeDarkCardLeftPic from "./images/HomeDarkCardLeftPic.png";
import HomeDarkCardRightPic from "./images/HomeDarkCardRightPic.png";

const formatNumber = (number) => {
  const suffixes = ['', 'k', 'M', 'B', 'T'];
  const suffixNum = Math.floor(('' + number).length / 3);
  const shortNumber = parseFloat((number / Math.pow(1000, suffixNum)).toFixed(1));
  return shortNumber >= 1 ? `${shortNumber}${suffixes[suffixNum]}+` : number.toString();
};

const CardBelowHome = () => {
  const adoptedPets = formatNumber(1212);

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <img src={HomeDarkCardLeftPic} alt="Dog with toy" style={styles.image} />
        <p style={styles.text}>
          <span style={styles.number}>{adoptedPets}</span><br />
          Furry Friends<br />Living Their Best Lives
        </p>
      </div>

      <div style={styles.rightSection}>
        <img src={HomeDarkCardRightPic} alt="Dog pic" style={styles.image} />
        <p style={styles.subheading}>WHAT WE DO?</p>
        <p style={styles.rightText}>
          With a focus on matching the right pet with the right family, <strong>PawFinds</strong> makes it easy to adopt love and foster happiness.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "#1f1f2e",
    color: "#fff",
    padding: "40px 20px",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
    textAlign: "center",
  },
  leftSection: {
    flex: "1 1 300px",
    maxWidth: "450px",
  },
  rightSection: {
    flex: "1 1 300px",
    maxWidth: "450px",
  },
  image: {
    width: "100%",
    maxWidth: "200px",
    height: "auto",
    margin: "0 auto",
    display: "block",
  },
  text: {
    marginTop: "20px",
    fontSize: "20px",
    lineHeight: "1.4",
  },
  number: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "#fff",
  },
  subheading: {
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "20px",
    color: "#bdbdbd",
  },
  rightText: {
    marginTop: "10px",
    fontSize: "16px",
    lineHeight: "1.5",
  },
};

export default CardBelowHome;
