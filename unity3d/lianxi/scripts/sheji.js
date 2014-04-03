function Start() {

}
var speed: int = 100;

var newobject: Transform;

var count: int = 0;

function Update() {
	var x: float = Input.GetAxis("Horizontal") * Time.deltaTime * speed;
	var z: float = Input.GetAxis("Vertical") * Time.deltaTime * speed;
	transform.Translate(x, 0, z);
	if (Input.GetButtonDown("Fire1")) {
		var n: Transform = Instantiate(newobject, transform.position, transform.rotation);
		var fwd: Vector3 = transform.TransformDirection(Vector3.forward);
		n.rigidbody.AddForce(fwd * 10000);

		count++;

		gameObject.Find("shedanshu").GetComponent(GUIText).text = "射弹数:" + count;
	}
	if (Input.GetKey(KeyCode.Q))
		transform.Rotate(0, -25.0 * Time.deltaTime, 0, Space.Self);
	if (Input.GetKey(KeyCode.E))
		transform.Rotate(0, 25.0 * Time.deltaTime, 0, Space.Self);

	if (Input.GetKey(KeyCode.Z))
		transform.Rotate(-25.0 * Time.deltaTime, 0, 0, Space.Self);
	if (Input.GetKey(KeyCode.C))
		transform.Rotate(25.0 * Time.deltaTime, 0, 0, Space.Self);

	if (Input.GetKey(KeyCode.H))
		transform.Translate(0, 25.0 * Time.deltaTime, 0, Space.Self);
	if (Input.GetKey(KeyCode.N))
		transform.Translate(0, -25.0 * Time.deltaTime, 0, Space.Self);
}