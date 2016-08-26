# BREAKY.JS

**A javascript plug-in for detecting/syncing CSS media-queries**

Lightweight and easy-to-use plugin for Javascript media-queries detection. Includes automated functions
management to assign functions to specific breakpoints.

Original Documentation: [http://qrious.com/breaky/](http://qrious.com/breaky/)

DOWNLOAD FROM NPM
----
```
npm install breaky --save
```
SET-UP
----
**Incude:** breaky.js
```js
<script href="breaky.js"></script>
```
**CSS:** Use the pseudo-element :before and property content on the HTML to list the breakpoints for Breaky to detect. Each breakpoints' name must be separated by commas and in order from smallest to largest viewport. Name it anything and set as many breakpoints as you want.
```css
html:before {
	content: "mobile,tablet,desktop";
	display: none;
}
```
Use the pseudo-element :before and property content on the BODY set media-queries for Breaky to detect. It should follow the same naming convention as the list set in the HTML.

```css
body:before {
	content: "mobile";
	display: none; 
}
@media (min-width: 320px) {
	body:before {
		content: "mobile";
	}
}
@media (min-width: 768px) {
	body:before {
		content: "tablet";
	}
}
@media (min-width: 960px) {
	body:before {
		content: "desktop";
	}
}
```

ASSIGNING FUNCTIONS TO BREAKPOINTS
----
**JS:** There are four Breaky methods to utilize when assigning functions to one or a series of breakpoints: at, above, below, and between.

Assign a function to one breakpoint: **at()**
```js
breaky.at("mobile", function() {
    // custom logic
});
```

Assign a function to and above a breakpoint: **above()**
```js
breaky.above("mobile", function() {
    // custom logic
});
```

Assign a function to and below a breakpoint: **below()**
```js
breaky.below("desktop", function() {
    // custom logic
});
```

Assign a function between breakpoints: **between()**
```js
breaky.between("mobile", "tablet", function() {
    // custom logic
});
```
