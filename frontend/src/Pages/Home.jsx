import React from "react";
import { connect } from "react-redux";
import { refresh } from "../reducer/Actions";

const Home = ({ refresh }) => {
    return (
        <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">Hi Welcome to SALTY, A project managment tool for MSRIT</h1>
                <p className="col-md-8 fs-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus incidunt odio omnis excepturi nobis repudiandae, molestiae, ducimus minus itaque ipsa facilis voluptatibus laboriosam necessitatibus suscipit. Facere rerum impedit culpa deleniti eligendi enim quisquam. Quibusdam iste, perspiciatis quasi recusandae et sequi repudiandae veniam. Quaerat voluptatum ducimus minus sunt voluptates aliquid consectetur!</p>
                <button className="btn btn-primary btn-lg" type="button" onClick={ refresh }>Refresh</button>
            </div>
        </div>
    )
}

export default connect(null, { refresh })(Home);