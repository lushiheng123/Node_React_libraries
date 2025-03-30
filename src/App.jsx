import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [astragalusData, setAstragalusData] = useState({
    root_length: '',
    yield: '',
    c7g_content: '',
  });
  const [climateData, setClimateData] = useState({});
  const [astragalusResult, setAstragalusResult] = useState(null);
  const [climateResult, setClimateResult] = useState(null);

  const handleAstragalusChange = (e) => {
    setAstragalusData({ ...astragalusData, [e.target.name]: e.target.value });
  };

  const handleClimateChange = (e) => {
    setClimateData({ ...climateData, [e.target.name]: e.target.value });
  };

  const handleAstragalusSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/astragalus/predict', astragalusData);
      setAstragalusResult(response.data);
    } catch (error) {
      console.error(error);
      alert('预测失败，请检查输入数据');
    }
  };

  const handleClimateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/climate/predict', climateData);
      setClimateResult(response.data);
    } catch (error) {
      console.error(error);
      alert('预测失败，请检查输入数据');
    }
  };

  return (
    <div className="p-4 " >
      <h1 className="text-xl font-bold mb-4">预测系统</h1>

      {/* Astragalus 表单 */}
      <form onSubmit={handleAstragalusSubmit} className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Astragalus 预测</h2>
        <input
          type="number"
          name="root_length"
          placeholder="根长 (cm)"
          value={astragalusData.root_length}
          onChange={handleAstragalusChange}
          className="block mb-2 p-2 border"
          required
        />
        <input
          type="number"
          name="yield"
          placeholder="产量 (kg/mu)"
          value={astragalusData.yield}
          onChange={handleAstragalusChange}
          className="block mb-2 p-2 border"
          required
        />
        <input
          type="number"
          name="c7g_content"
          placeholder="C7G 含量 (%)"
          value={astragalusData.c7g_content}
          onChange={handleAstragalusChange}
          className="block mb-2 p-2 border"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">提交</button>
      </form>
      {astragalusResult && (
        <div className="mb-6">
          <h3 className="font-semibold">预测结果:</h3>
          <pre>{JSON.stringify(astragalusResult, null, 2)}</pre>
        </div>
      )}

      {/* Climate 表单 */}
      <form onSubmit={handleClimateSubmit}>
        <h2 className="text-lg font-semibold mb-2">Climate 预测</h2>
        {/* 动态生成输入框 */}
        {['bio1', 'bio2', 'bio3', 'bio4', 'bio5'].map((feature) => (
          <input
            key={feature}
            type="number"
            name={feature}
            placeholder={`${feature} 值`}
            value={climateData[feature] || ''}
            onChange={handleClimateChange}
            className="block mb-2 p-2 border"
            required
          />
        ))}
        <button type="submit" className="bg-green-500 text-white px-4 py-2">提交</button>
      </form>
      {climateResult && (
        <div>
          <h3 className="font-semibold">预测结果:</h3>
          <pre>{JSON.stringify(climateResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
