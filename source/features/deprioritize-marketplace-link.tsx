import React from 'dom-chef';
import select from 'select-dom';
import onetime from 'onetime';
import domLoaded from 'dom-loaded';
import elementReady from 'element-ready';
import * as pageDetect from 'github-url-detection';

import features from '.';

async function init(): Promise<void> {
	const marketPlaceLink = (await elementReady('.Header-link[href="/marketplace"]'));
	if (marketPlaceLink) {
		// The Marketplace link seems to have an additional wrapper that other links don't have https://i.imgur.com/KV9rtSq.png
		marketPlaceLink.closest('.border-top, .mr-3')!.remove();
	}

	await domLoaded;

	select.last('.header-nav-current-user ~ .dropdown-divider')!.before(
		<div className="dropdown-divider"/>,
		<a className="dropdown-item" href="/marketplace">Marketplace</a>
	);
}

void features.add({
	id: __filebasename,
	description: 'Moves the "Marketplace" link from the black header bar to the profile dropdown.',
	screenshot: false
}, {
	exclude: [
		pageDetect.isGist
	],
	waitForDomReady: false,
	init: onetime(init)
});
