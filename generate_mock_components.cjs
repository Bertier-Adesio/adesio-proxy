const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'SiliconExpert json examples');
const outputDir = path.join(__dirname, 'SiliconExpert generated examples');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Read all available examples to use as templates
const exampleFiles = fs.readdirSync(inputDir).filter(f => f.endsWith('.json'));
if (exampleFiles.length === 0) {
  console.error("No JSON examples found.");
  process.exit(1);
}

const templates = exampleFiles.map(file => {
  const content = fs.readFileSync(path.join(inputDir, file), 'utf8');
  return JSON.parse(content);
});

const numToGenerate = 500; // Generate hundreds as requested

const manufacturers = ['Texas Instruments', 'Analog Devices', 'Vishay', 'NXP Semiconductors', 'STMicroelectronics', 'Infineon', 'Microchip', 'Littelfuse', 'ON Semiconductor', 'Renesas'];
const prefixes = ['LM', 'AD', 'VSH', 'NXP', 'STM', 'INF', 'MCP', 'LTF', 'ONS', 'REN'];
const partTypes = ['Rectifier', 'Op-Amp', 'Microcontroller', 'MOSFET', 'Voltage Regulator', 'Capacitor', 'Resistor', 'Transistor'];

let generatedCount = 0;

for (let i = 0; i < numToGenerate; i++) {
  // Randomly select a template to add more variety
  const templateIndex = Math.floor(Math.random() * templates.length);
  const template = templates[templateIndex];
  
  // Deep copy the template
  const newComponent = JSON.parse(JSON.stringify(template));
  
  // Generate a mock ID
  const mockId = Math.floor(Math.random() * 90000000) + 10000000;
  
  // Update IDs
  if (newComponent.Results && newComponent.Results.ResultDto) {
    const summary = newComponent.Results.ResultDto.SummaryData || {};
    
    // Pick random manufacturer
    const mfgIndex = Math.floor(Math.random() * manufacturers.length);
    const mfg = manufacturers[mfgIndex];
    const prefix = prefixes[mfgIndex];
    
    // Sometimes add a random suffix for variety
    const suffix = Math.random() > 0.5 ? ['A', 'B', 'C', 'TR', 'T', 'Z'][Math.floor(Math.random() * 6)] : '';
    const randomPartNum = `${prefix}-${Math.floor(Math.random() * 9000) + 1000}${suffix}`;
    const randomPartType = partTypes[Math.floor(Math.random() * partTypes.length)];
    
    newComponent.Results.ResultDto.RequestedComID = mockId.toString();
    summary.DataProviderID = mockId.toString();
    summary.PartNumber = randomPartNum;
    summary.Manufacturer = mfg;
    summary.ManufacturerID = Math.floor(Math.random() * 5000).toString();
    summary.PartDescription = `${randomPartType} - Mock Description ${Math.floor(Math.random() * 100)}`;
    
    // Randomize inventory
    if (newComponent.Results.ResultDto.FranchisedInventoryData && newComponent.Results.ResultDto.FranchisedInventoryData.FranchisedInventoryDto) {
       newComponent.Results.ResultDto.FranchisedInventoryData.FranchisedInventoryDto.forEach(dist => {
           dist.Quantity = Math.floor(Math.random() * 15000).toString();
       });
    }
  }

  const outputPath = path.join(outputDir, `${mockId}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(newComponent, null, 2));
  generatedCount++;
}

console.log(`Successfully generated ${generatedCount} mock components.`);
