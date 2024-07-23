import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";

const app = new Hono();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.get("/api/hello", (c) => {
	return c.json({
		ok: true,
		message: "Hello Hono!",
	});
});

app.get("/posts/:id", (c) => {
	const page = c.req.query("page");
	const id = c.req.param("id");
	c.header("X-Message", "Hi!");
	return c.text(`You want see ${page} of ${id}`);
});

app.get("/queries", (c) => {
	const queries = c.req.queries("p1");
	return c.text(`You want see ${queries?.toString()}`);
});

app.get("/routePath/:id", (c) => {
	return c.text(`You see route path ${c.req.routePath}`);
});

app.get("/path/:id", (c) => {
	return c.text(`You see path ${c.req.path}`);
});

app.get("/very/long/url", (c) => {
	return c.text(`You see ${c.req.url}`);
});

app.get("/method", (c) => {
	return c.text(`Your method is ${c.req.method}\n`);
});

app.post("/method", (c) => {
	return c.text(`Your method is ${c.req.method}\n`);
});

app.delete("/method", (c) => {
	return c.text(`Your method is ${c.req.method}\n`);
});

const View = () => {
	return (
		<html lang="en">
			<body>
				<h1>Hello Hono!</h1>
			</body>
		</html>
	);
};

app.get("/page", (c) => {
	return c.html(<View />);
});

app.get("/htmltext", (c) => {
	return c.text(<View />);
});

app.use(
	"/admin/*",
	basicAuth({
		username: "admin",
		password: "password",
	}),
);

app.get("/admin", (c) => {
	return c.text("Admin page");
});

export default app;
