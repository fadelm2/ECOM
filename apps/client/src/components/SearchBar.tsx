import {Search} from "lucide-react"

const SearchBar = () => {
    return (
        <div className="search-bar">
            <Search className="w-4 h-4 text-gray-500" />
            <input id="search" type="text" placeholder="Search" className="text-sm-outline-0" />
        </div>
    )
}

export default SearchBar;