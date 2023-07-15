export default function numberFormat(number) {
    if (number) return `CZK ${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}


