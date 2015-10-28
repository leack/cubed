$(function(){
	console.log('init');

	var cubesPerSide = 7;
	var cubeFace = new THREE.Object3D();//create an empty container


	//setup scene
	var scene = new THREE.Scene();
	//setup camera
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	//setup renderer
	var renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );


	var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
	directionalLight.position.set( 0, 0, 10 );
	directionalLight.rotation.set( -90, 0, 0 );
	scene.add( directionalLight );

	//set camera pos
	camera.position.z = 20;


	//setup cube
	function setupMainCube() {

		for ( var i = 0; i < (cubesPerSide*cubesPerSide) ; i++ ) {

			var row = Math.floor( i / cubesPerSide );

			console.log(row);

			var geometry = new THREE.BoxGeometry( 1, 1, 1 );
			geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
			var material = new THREE.MeshLambertMaterial({
				color: 0x222222
			});
			var cube = new THREE.Mesh( geometry, material );

			cube.position.x = i / 7;
			cube.position.y = -row;

			cubeFace.add( cube );

		}

		//add cubeface object
		scene.add(cubeFace);

		//position cube face


	}
	setupMainCube();


	//main render loop function
	function render() {
		requestAnimationFrame( render );

		// cubeFace.rotation.x += 0.01;
		// cubeFace.rotation.y += 0.01;

		//cube.scale.y += 0.01;

		//render scene
		renderer.render( scene, camera );
	}
	render();


	//update screen, camera and render on window resize
	window.addEventListener( 'resize', onWindowResize, false );
	function onWindowResize(){
	    camera.aspect = window.innerWidth / window.innerHeight;
	    camera.updateProjectionMatrix();
	    renderer.setSize( window.innerWidth, window.innerHeight );
	}


	//stats
	var stats = new Stats();
	stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb
	// align top-left
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.body.appendChild( stats.domElement );
	var update = function () {
	    stats.begin();
	    // monitored code goes here
	    stats.end();
	    requestAnimationFrame( update );
	};
	update();

});