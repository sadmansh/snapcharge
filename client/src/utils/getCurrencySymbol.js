export default function(currency) {
	switch (currency) {
		case 'usd':
			return '$'
		case 'gbp':
			return '£'
		case 'eur':
			return '€'
		case 'aud':
			return 'A$'
		default:
			return '$'
	}
}