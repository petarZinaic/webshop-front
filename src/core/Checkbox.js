import { useState } from "react";

const Checkbox = ({ categories }) => {

    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input
                type="checkbox"
                className="form-check-input"
            />
            <label className="form-check-label">{c.name}</label>
        </li>
    ));
}

export default Checkbox;
