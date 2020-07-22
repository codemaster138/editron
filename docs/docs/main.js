var converter = new showdown.Converter();

function findGetParameter(parameterName) {
	var result = null,
		tmp = [];
	location.search
		.substr(1)
		.split("&")
		.forEach(function (item) {
			tmp = item.split("=");
			if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
		});
	return result;
}

$.ajax({
	url: 'README.md'
}).done((data) => {
	$('main')[0].innerHTML = converter.makeHtml(data);
	let children = $('main')[0].children;
	for (let i = 0; i < children.length; i++) {
		if (children[i].tagName == 'H1') {
			$('aside')[0].innerHTML += `<a class="h1" id="hl-${i}" href="#${children[i].id}">${children[i].innerHTML}</a>`;
		} else if (children[i].tagName == 'H2') {
			$('aside')[0].innerHTML += `<a class="h2" id="hl-${i}" href="#${children[i].id}">${children[i].innerHTML}</a>`;
		}
		if (children[i].tagName == 'H1' || children[i].tagName == 'H2') {
			children[i].dataset.num = i;
			let wp = new Waypoint({
				element: children[i],
				handler: function () {
					$('.current').removeClass('current');
					let el = $(`#hl-${this.element.dataset.num}`);
					el.addClass('current');
				},
				context: $('#main')[0]
			});
		}
	}



	if (findGetParameter('search') !== null) {
		let s = findGetParameter('search');
		let tokens = s.split('+');
		let allText = $('main')[0].innerText;
		let regex = new RegExp(tokens.join('|'), 'gim');
		let i = allText.search(regex);
	}

	document.querySelectorAll('pre').forEach(pre => {
		pre.classList.add('prettyprint');
		pre.classList.add('linenums');
	});
	PR.prettyPrint();
});