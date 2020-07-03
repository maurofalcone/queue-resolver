import { MenuItem, Select, InputLabel } from '@material-ui/core';
import MM1 from './models/mm1';
import MG1 from './models/mg1';
import { MODELS } from '../helpers/enums';
import * as css from './app.module.css';
import React, { useState } from 'react';

const renderModel = (modelType) => {
  switch (modelType) {
    case MODELS.MM1:
      return <MM1 />
    case MODELS.MG1:
      return <MG1 />
    default:
      break;
  }
}

const App = () => {
  const [model, setModel] = useState(MODELS.MM1);

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setModel(value);
  }

  const renderSelect = () => (
    <div className={css.selectContainer}>
      <InputLabel>Model</InputLabel>
      <Select
        className={css.select}
        value={model}
        onChange={handleChange}
      >
        <MenuItem value={MODELS.MM1}>M/M/1</MenuItem>
        <MenuItem value={MODELS.MG1}>M/G/1</MenuItem>
      </Select>
    </div>
  )

  return (
    <form className={css.container} autoComplete="off">
      <div className={css.mainContent}>
        {renderSelect()}
        {renderModel(model)}
      </div>
    </form>
  );
}

export default App;