let test_arr = [ [7,3], [7,3], [1,1], [0,0] ]
function removeMultiDuplicate(arr) {
	// loop
	// flat = JSON.Stringify( arr[i] )  
	// put flat result in a dictionary {flat: true}, if already in dic, look into next
	let res = []
	let findDuplicate = {}
	for (let i=0; i< arr.length; i++) {
		let flatten_result = JSON.stringify( arr[i] )
		console.log(flatten_result)
		if (findDuplicate[flatten_result]) {continue;}
		findDuplicate[flatten_result] = true 
		res.push(arr[i])

	}
	return res 
}

let res = removeMultiDuplicate(test_arr)
console.log(res)

