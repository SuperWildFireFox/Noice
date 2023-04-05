export default function Menu(props) {
    return (
    <li>
        <button
         aria-pressed={props.isPressed}
         onClick={() => props.setMunuChoose(props.name)}
         class={(props.isPressed?"border-l-4  border-green-400":"")+ " flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"}>
            <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-home"></i></span>
            <span class="text-sm font-medium">{props.name}</span>
        </button>
    </li>
    )
}