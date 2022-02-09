import style from "./App.module.scss";
import Header from "./components/Header/Header";
import PlaceBid from "./views/PlaceBid";

function App() {
  return (
    <div className={style.App}>
      <Header />
      <PlaceBid />
    </div>
  );
}

export default App;
