import { useState } from "react";

function ContributionForm({ addContribution }) {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    addContribution(amount);
    setAmount("");
  };

  return (
    <form className="contribution-form" onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Contribute</button>
    </form>
  );
}

export default ContributionForm;
