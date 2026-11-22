import WatchForm from "../components/WatchForm.jsx";
import WatchList from "../components/WatchList.jsx";
import { useState } from "react";

export default function WatchlistPage() {
  // TASK 2: the watchlist live HERE, in the parent, not inside WatchForm or WatchList.
  // Replace the next line with useState, then fill in the three functions.
  const [watchlist, setWatchlist] = useState([]);


  function addItem(text) {
    // TODO: add { id: crypto.randomUUID(), text, watched: false } WITHOUT mutating the array
    setWatchlist([...watchlist, { id: crypto.randomUUID(), text, watched: false }]);
  }

  function toggleItem(id) {
    // TODO: flip watched for the item with this id (use map and a copy)
    setWatchlist(watchlist.map((item) => (item.id === id ? { ...item, watched: !item.watched } : item)));
  }

  function deleteItem(id) {
    // TODO: remove the item with this id (use filter)
    setWatchlist(watchlist.filter((item) => item.id !== id));
  }

  // TASK 2: derived data. Compute it from watchlist. Do NOT store it in state.
  const toWatch = watchlist.filter((item) => !item.watched).length;

  return (
    <section className="panel">
      <h2>Watchlist ({toWatch} to watch)</h2>
      <WatchForm onAdd={addItem} />
      <WatchList watchlist={watchlist} onToggle={toggleItem} onDelete={deleteItem} />
    </section>
  );
}
