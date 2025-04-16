// components/SurveyResults.js
import { useEffect, useRef } from 'react';


export default function SurveyResults({ results }) {
  // Create refs for each chart canvas
  const chartRefs = useRef({});
  
  useEffect(() => {
    // Draw charts after component mounts
    Object.keys(results).forEach(questionIndex => {
      const canvas = chartRefs.current[questionIndex];
      if (canvas) {
        drawChart(canvas, results[questionIndex]);
      }
    });
  }, [results]);
  
  const drawChart = (canvas, questionResult) => {
    const ctx = canvas.getContext('2d');
    const { options, percentages } = questionResult;
    
    // Set canvas dimensions
    canvas.width = 400;
    canvas.height = 200;
    
    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate bar dimensions
    const barCount = options.length;
    const barWidth = (canvas.width - 100) / barCount;
    const maxBarHeight = 150;
    
    // Draw bars
    options.forEach((option, i) => {
      const percentage = percentages[i] || 0;
      const barHeight = (percentage / 100) * maxBarHeight;
      const x = 50 + i * barWidth;
      const y = canvas.height - 30 - barHeight;
      
      // Draw bar
      ctx.fillStyle = `rgba(0, 100, 255, ${0.4 + (percentage / 100) * 0.6})`;
      ctx.fillRect(x, y, barWidth - 10, barHeight);
      
      // Draw percentage
      ctx.fillStyle = '#000';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${percentage.toFixed(1)}%`, x + (barWidth - 10) / 2, y - 5);
      
      // Draw option label
      ctx.fillText(
        option.length > 15 ? option.substring(0, 15) + '...' : option,
        x + (barWidth - 10) / 2,
        canvas.height - 10
      );
    });
  };
  
  return (
    <div className="survey-results">
      {Object.keys(results).map(questionIndex => {
        const questionResult = results[questionIndex];
        return (
          <div key={questionIndex} className="result-item">
            <h3>{questionResult.question}</h3>
            <canvas
              ref={el => chartRefs.current[questionIndex] = el}
              className="result-chart"
            ></canvas>
          </div>
        
        );
      })}
    </div>
  );
  
}