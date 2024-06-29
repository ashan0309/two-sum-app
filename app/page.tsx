'use client';
import { useState } from 'react';

const Home = () => {
  const [numbers, setNumbers] = useState<number[]>([2, 7, 11, 15]);
  const [target, setTarget] = useState<number>(9);
  const [result, setResult] = useState<[number, number] | null>(null);

  const findTwoSumIndices = (nums: number[], target: number): [number, number] => {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[left] + nums[right];
      if (sum === target) {
        return [left + 1, right + 1];
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }

    throw new Error('No two sum solution');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const indices = findTwoSumIndices(numbers, target);
      setResult(indices);
    } catch (error: any) {
      setResult(null);
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Find Two Sum Indices</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Numbers (comma separated):
            <input
              type="text"
              value={numbers.join(', ')}
              onChange={(e) => setNumbers(e.target.value.split(',').map(Number))}
              style={{ marginLeft: '0.5rem' }}
            />
          </label>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label>
            Target:
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              style={{ marginLeft: '0.5rem' }}
            />
          </label>
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Find Indices</button>
      </form>
      {result && (
        <div style={{ marginTop: '1rem' }}>
          <h2>Result</h2>
          <p>Indices: [{result[0]}, {result[1]}]</p>
        </div>
      )}
    </div>
  );
};

export default Home;
