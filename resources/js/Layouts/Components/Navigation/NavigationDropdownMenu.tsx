import NavigationDropdownItem from "./NavigationDropdownItem"

interface DropDownItem {
    destination: string,
    name: string,
}

export default function NavigationDropdownMenu ({
    currentUrl,
    dropdownItems,
    name,
}:{
    currentUrl: string,
    dropdownItems: DropDownItem[],
    name: string,
}) {

    // Check if the currently active page url is part of this dropdowns menu items
    const dropdownItemsIncludeCurrentUrl = () => {
        for (let i=0 ; i < dropdownItems.length ; i++){
            if(dropdownItems[i].destination === currentUrl){
                return true
            }
        }
        return false
    }

    return (
        <div className={`
            group relative w-[150px] text-center text-[#999999] border-4 border-transparent transition-all duration-300 hover:cursor-pointer hover:text-mainOrange hover:border-b-mainOrange 
            ${
                dropdownItemsIncludeCurrentUrl() === true
                ? "border-b-mainOrange text-mainOrange" 
                : "group-hover:border-b-mainOrange group-hover:text-mainOrange"
            }
        `}>

            {name}

            <div className="absolute bg-mainDark w-[150px] max-h-0 overflow-hidden mt-1 -ml-[4px] flex flex-col z-20 border-0 border-transparent rounded-b-lg group-hover:border-mainOrange transition-all duration-700 group-hover:flex group-hover:max-h-screen group-hover:overflow-ellipsis group-hover:border">

            {
                dropdownItems.map((item) => (
                    <NavigationDropdownItem 
                        currentUrl={currentUrl}
                        destination={item.destination}
                        name={item.name}
                    />
                ))
            }    

            {/* {children} */}

            </div>
        </div>
    )
}