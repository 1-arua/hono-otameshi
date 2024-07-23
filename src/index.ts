import { Hono } from "hono";

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

export default app;
