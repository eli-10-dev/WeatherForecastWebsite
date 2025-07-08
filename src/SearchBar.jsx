import './SearchBar.css';

function SearchBar({ setSearchQuery, callUpdateIsReady }) {

  return (
    <div className="searchbar-container">
      <input type="text" className="search-bar" placeholder="Search" 
             onChange={e => setSearchQuery(e.target.value)} 
             />
             
      <button type="button" className="search-button" 
              onClick={() => {
                callUpdateIsReady();
              }}
      >
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
      </button>
    </div>
  );
}

export default SearchBar;