export const getList = async (url,serach=null) => {
	let list = null;
	if(!serach) {
		const {data: res} = await uni.$http.get(url);
		list = res.message
	}else {
		const {data: res} = await uni.$http.get(url, {query: `${serach}`});
		list = res.message
	}
	return list;
}