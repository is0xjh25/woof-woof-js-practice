function getPups() {
	return fetch(`http://localhost:3000/pups`)
	.then(res => {
		return res.json()
	}).then(json => json);
}

function getPupById(id) {
	return fetch(`http://localhost:3000/pups/${id}`)
	.then(res => {
		return res.json()
	}).then(json => json);
}

function updateDog(id) {
	return getPupById(id).then(pup => {
		fetch(`http://localhost:3000/pups/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				isGoodDog: !pup.isGoodDog
			})
		}).then(res => {
			return res.json();
		}).then(json => {
			return json;
		})
	})
}

document.addEventListener('DOMContentLoaded', () => {
	getPups().then(pups => {
		console.log(pups);
		pups.forEach(pup => {
			let list = document.createElement('span');
			list.innerHTML = pup.name;
		})

		document.getElementById('dog-bar').appendChild(list);

		list.addEventListener('click', () => {
			document.querySelector('#dog-info').innerHTML = "";
			let dogImg = document.createElement('img');
			dogImg.setAttribute('src', `${pup.image}`);
			let dogName = document.createElement('h2');
			dogName.innerHTML = pup.name;
			let dogButton = document.createElement('button');
			dogButton.innerHTML = pup.isGoodDog ? 'Good dog!' : 'Bad dog!';
			let dogInfo = document.querySelector('#dog-info');
			dogInfo.append(dogImg);
			dogInfo.append(dogName);
			dogInfo.append(dogButton);

			dogButton.addEventListener('click', (e) => {
				e.preventDefault();
				updateDog(pup.id).then(toggle => {
					dogButton.innerHTML = toggle.isGoodDog ? "Good dog!" : "Bad dog"; 
				})
			})
		})
	})
})