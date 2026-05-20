import React, { useState, useEffect } from 'react';
import { 
  UploadCloud, FileType, CheckCircle, ArrowRight, Sparkles, RefreshCw,
  AlertTriangle, XCircle, HelpCircle, Check, ChevronRight, ChevronDown, Mail,
  Link, Settings, Server, Database, Lock, Key, Globe, Eye, EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

// Literal content of example_feed_file.csv embedded for the quick demo experience
const DEMO_CSV_CONTENT = `manufacturer,mpn,sku,distributor-url,quantity,price-break-1,price-usd-1,price-eur-1,price-break-2,price-usd-2,price-eur-2,description,datasheet-url,image-url,simulation-model-url-1,simulation-model-url-2,attributes,category,moq,order-multiple,on-order-quantity,on-order-eta,packaging,factory-lead-days,factory-pack-quantity,datecode
Texas Instruments,NE555P,123-ABC,http://example.com/purchase/ne555n.html,1000,1,0.25,0.1,100,0.19,0.09,"Highly stable, general purpose bipolar timer",http://example.com/datasheets/ne555n.pdf,http://example.com/images/ne555n.jpg,"{""description"" : ""PSPICE"", ""url"" : ""http://example.com/simulation/NE555P.ckt""}","{""description"" : ""PSPICE"", ""url"" : ""http://example.com/simulation/NE555P.lbr""}","{""Approx. price(US$)"": ""0.05 | 1ku"", ""Function"": ""General-purpose timer"", ""Iq(Typ)(uA)"": ""2000"", ""Operating temperature range(C)"": ""0 to 70"", ""Package Group"": ""PDIP|8,SOIC|8,SO|8,TSSOP|8"", ""Rating"": ""Catalog"", ""VCC(Max)(V)"": ""16"", ""VCC(Min)(V)"": ""4.5"", ""case_package"": ""SOIC"", ""lifecycle_status"": {""metadata"": {""observation_date"": ""2020-05-16T23:14:10Z""}, ""value"": ""ACTIVE""}, ""number_of_pins"": ""8"", ""pb_free"": ""Y"", ""rohs_compliance"": ""Y"", ""size_height"": ""1.75 mm"", ""size_length"": ""4.9 mm"", ""size_thickness"": ""1.58 mm"", ""size_width"": ""3.91 mm""}",Integrated Circuits>>Timing,100,5,10000,4/1/13,Tube,14,8000,1/1/13
Texas Instruments,SN74S74N,234-XYZ,http://example.com/purchase/sn74s74.html,1400,1,1.2,0.8,1000,0.95,0.05,Dual D-Type Positive Edge Triggered Flop Flop,http://example.com/datasheets/sn74s74n.pdf,http://example.com/images/sn74s74n.jpg,"{""description"" : ""PSPICE"", ""url"" : ""http://example.com/simulation/SN74S74N.ckt""} ","{""description"" : ""PSPICE"", ""url"" : ""http://example.com/simulation/SN74S74N.lbr""} ","{""Approx. price(US$)"": ""0.50 | 1ku"", ""Channels(#)"": ""2"", ""Clock Frequency(Max)(MHz)"": ""50"", ""Features"": ""High speed (tpd 10-50ns)"", ""ICC(uA)"": ""25000"", ""IOH(Max)(mA)"": ""-1"", ""IOL(Max)(mA)"": ""20"", ""Input type"": ""Bipolar"", ""Output type"": ""Push-Pull"", ""Package Group"": ""PDIP|14,SOIC|14,SO|14"", ""Rating"": ""Catalog"", ""Technology Family"": ""S"", ""VCC(Max)(V)"": ""5.25"", ""VCC(Min)(V)"": ""4.75"", ""case_package"": ""SOIC"", ""lifecycle_status"": {""metadata"": {""observation_date"": ""2020-05-16T23:14:10Z""}, ""value"": ""ACTIVE""}, ""number_of_pins"": ""14"", ""pb_free"": ""Y"", ""rohs_compliance"": ""Y"", ""size_height"": ""1.75 mm"", ""size_length"": ""8.65 mm"", ""size_thickness"": ""1.58 mm"", ""size_width"": ""3.91 mm""}",Integrated Circuits>>Flip-Flop,1,1,2000,4/1/13,Bulk,21,2000,1/1/13`;

const DEMO_TSV_CONTENT = `manufacturer	mpn	sku	distributor-url	quantity	price-break-1	price-usd-1	price-eur-1	price-break-2	price-usd-2	price-eur-2	description	datasheet-url	image-url	simulation-model-url-1	simulation-model-url-2	attributes	category	moq	order-multiple	on-order-quantity	on-order-eta	packaging	factory-lead-days	factory-pack-quantity	datecode
Texas Instruments	NE555P	123-ABC	http://example.com/purchase/ne555n.html	1000	1	0.25	0.1	100	0.19	0.09	Highly stable, general purpose bipolar timer	http://example.com/datasheets/ne555n.pdf	http://example.com/images/ne555n.jpg	"{""description"" : ""PSPICE"", ""url"" : ""http://example.com/simulation/NE555P.ckt""}"	"{""description"" : ""PSPICE"", ""url"" : ""http://example.com/simulation/NE555P.lbr""}"	"{""Approx. price(US$)"": ""0.05 | 1ku"", ""Function"": ""General-purpose timer"", ""Iq(Typ)(uA)"": ""2000"", ""Operating temperature range(C)"": ""0 to 70"", ""Package Group"": ""PDIP|8,SOIC|8,SO|8,TSSOP|8"", ""Rating"": ""Catalog"", ""VCC(Max)(V)"": ""16"", ""VCC(Min)(V)"": ""4.5"", ""case_package"": ""SOIC"", ""lifecycle_status"": {""metadata"": {""observation_date"": ""2020-05-16T23:14:10Z""}, ""value"": ""ACTIVE""}, ""number_of_pins"": ""8"", ""pb_free"": ""Y"", ""rohs_compliance"": ""Y"", ""size_height"": ""1.75 mm"", ""size_length"": ""4.9 mm"", ""size_thickness"": ""1.58 mm"", ""size_width"": ""3.91 mm""}"	Integrated Circuits>>Timing	100	5	10000	4/1/13	Tube	14	8000	1/1/13
Texas Instruments	SN74S74N	234-XYZ	http://example.com/purchase/sn74s74.html	1400	1	1.2	0.8	1000	0.95	0.05	Dual D-Type Positive Edge Triggered Flop Flop	http://example.com/datasheets/sn74s74n.pdf	http://example.com/images/sn74s74n.jpg	"{""description"" : ""PSPICE"", ""url"" : ""http://example.com/simulation/SN74S74N.ckt""} "	"{""description"" : ""PSPICE"", ""url"" : ""http://example.com/simulation/SN74S74N.lbr""} "	"{""Approx. price(US$)"": ""0.50 | 1ku"", ""Channels(#)"": ""2"", ""Clock Frequency(Max)(MHz)"": ""50"", ""Features"": ""High speed (tpd 10-50ns)"", ""ICC(uA)"": ""25000"", ""IOH(Max)(mA)"": ""-1"", ""IOL(Max)(mA)"": ""20"", ""Input type"": ""Bipolar"", ""Output type"": ""Push-Pull"", ""Package Group"": ""PDIP|14,SOIC|14,SO|14"", ""Rating"": ""Catalog"", ""Technology Family"": ""S"", ""VCC(Max)(V)"": ""5.25"", ""VCC(Min)(V)"": ""4.75"", ""case_package"": ""SOIC"", ""lifecycle_status"": {""metadata"": {""observation_date"": ""2020-05-16T23:14:10Z""}, ""value"": ""ACTIVE""}, ""number_of_pins"": ""14"", ""pb_free"": ""Y"", ""rohs_compliance"": ""Y"", ""size_height"": ""1.75 mm"", ""size_length"": ""8.65 mm"", ""size_thickness"": ""1.58 mm"", ""size_width"": ""3.91 mm""}"	Integrated Circuits>>Flip-Flop	1	1	2000	4/1/13	Bulk	21	2000	1/1/13`;

// Explicitly broken feed simulating real-world failures (header typos, invalid urls, row length errors)
const DEMO_BROKEN_CONTENT = `manufactur,mpn,sku,distributor_url,quantity,price-usd-1,description,datasheet-url,attributes
Texas Instruments,NE555P,123-ABC,example.com/purchase/ne555n.html,1000,0.25,"Highly stable, general purpose bipolar timer",example.com/datasheets/ne555n.pdf,"{""case_package"": ""SOIC"", ""rohs_compliance"": ""Y"", ""lifecycle_status"": {""value"": ""ACTIVE""}}"
Texas Instruments,SN74S74N,234-XYZ,http://example.com/purchase/sn74s74.html,1400,1.2,Flip flop`;

// Supported column headers from Octopart spec
const SUPPORTED_HEADERS = [
  'manufacturer', 'mpn', 'sku', 'distributor-url', 'eligible-region', 'quantity',
  'multipack-quantity', 'price-break-1', 'price-break-2', 'price-break-reference',
  'description', 'attributes', 'category', 'manufacturer-url', 'evalkit-url',
  'freesample-url', 'datasheet-url', 'image-url', 'symbol-footprint-url',
  'application-note-url', 'technical-drawing-url', '3d-model-url', 'instruction-sheet-url',
  'rohs-statement-url', 'materials-sheet-url', 'reach-statement-url', 'conflict-mineral-statement-url',
  'simulation-model-url', 'moq', 'order-multiple', 'on-order-quantity', 'on-order-eta',
  'packaging', 'factory-lead-days', 'factory-pack-quantity', 'datecode'
];

interface ValidationError {
  type: 'error' | 'warning';
  message: string;
  field?: string;
  row?: number;
  troubleshootingKey: 'headers' | 'formatting' | 'urls' | 'values' | 'extraneous' | 'listings';
}

interface AutoFix {
  id: string;
  type: 'rename_header' | 'add_url_prefix' | 'add_missing_header';
  description: string;
  action: () => void;
}

// Levenshtein Typo-Matcher
function getLevenshteinDistance(a: string, b: string): number {
  const tmp: number[][] = [];
  for (let i = 0; i <= a.length; i++) {
    tmp[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    tmp[0][j] = j;
  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1,
        tmp[i][j - 1] + 1,
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return tmp[a.length][b.length];
}

function findCloseMatch(header: string): string | null {
  const h = header.toLowerCase().trim().replace(/_/g, '-');
  if (h === 'manufactur' || h === 'manufacturers') return 'manufacturer';
  if (h === 'distributor_url' || h === 'distributorurl' || h === 'dist-url' || h === 'url') return 'distributor-url';
  if (h === 'lead-days' || h === 'factory-leadtime' || h === 'leaddays' || h === 'factory_lead_days') return 'factory-lead-days';
  if (h === 'qty' || h === 'quantities' || h === 'stock') return 'quantity';
  if (h === 'desc' || h === 'descs') return 'description';
  if (h === 'attr' || h === 'attrs') return 'attributes';

  for (const sup of SUPPORTED_HEADERS) {
    if (sup === h) return sup;
    if (getLevenshteinDistance(sup, h) <= 2) {
      return sup;
    }
  }
  return null;
}

function isUrlColumn(header: string): boolean {
  const h = header.toLowerCase().trim();
  if (h.endsWith('-url')) return true;
  if (/^simulation-model-url(-\d+)?$/.test(h)) return true;
  if (/-url(-\d+)?$/.test(h)) return true;
  return false;
}

// Robust RFC 4180 CSV/TSV Parser
function parseCSV(text: string, separator: string = ','): string[][] {
  const result: string[][] = [];
  let row: string[] = [];
  let inQuotes = false;
  let entry = '';
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i+1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        entry += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === separator && !inQuotes) {
      row.push(entry.trim());
      entry = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(entry.trim());
      if (row.length > 1 || row[0] !== '') {
        result.push(row);
      }
      row = [];
      entry = '';
    } else {
      entry += char;
    }
  }
  if (entry || row.length > 0) {
    row.push(entry.trim());
    result.push(row);
  }
  return result;
}

export default function IngestionEngine() {
  const [step, setStep] = useState<'integration-select' | 'upload' | 'api-config' | 'partner-select' | 'parsing' | 'validation' | 'mapping' | 'success'>('integration-select');
  const [ingestionFlow, setIngestionFlow] = useState<'file' | 'api'>('file');
  const [apiRoute, setApiRoute] = useState('https://api.adesioproxy.com/v1/supplier/ingest');
  const [secretId, setSecretId] = useState('sec_id_adesio_9f82d3b4e1a0');
  const [secretKey, setSecretKey] = useState('sec_key_adesio_7c2b4d5e9f8a0b1c2d3e4f5');

  const [showSecretKey, setShowSecretKey] = useState(false);
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [apiPayloadType, setApiPayloadType] = useState<'clean' | 'broken'>('clean');
  const [selectedPartners, setSelectedPartners] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [autoFixes, setAutoFixes] = useState<AutoFix[]>([]);
  const [injectedItems, setInjectedItems] = useState<any[]>([]);

  // Accordion state for troubleshooting
  const [activeTroubleSection, setActiveTroubleSection] = useState<string | null>(null);
  
  // Mapping schema
  const [mappings, setMappings] = useState<Record<string, { targetField: string; sampleValue: string; approved: boolean }>>({});
  
  const { addCatalogItems, addActivityLog } = useAppContext();

  // Run validation effect
  useEffect(() => {
    if (headers.length > 0) {
      runValidation(headers, rows);
    }
  }, [headers, rows]);

  const runValidation = (headersList: string[], rowsList: string[][]) => {
    const errors: ValidationError[] = [];
    const fixes: AutoFix[] = [];

    if (headersList.length === 0) return;

    // 1. Check Row Field Counts
    const mismatchedRows: number[] = [];
    rowsList.forEach((row, idx) => {
      if (row.length !== headersList.length) {
        mismatchedRows.push(idx + 2); // 1-indexed row number, +2 offset
      }
    });

    if (mismatchedRows.length > 0) {
      errors.push({
        type: 'error',
        message: `Mismatched columns: ${mismatchedRows.length} row(s) contain a different number of fields than the header row (Rows: ${mismatchedRows.slice(0, 5).join(', ')}${mismatchedRows.length > 5 ? '...' : ''}).`,
        troubleshootingKey: 'formatting'
      });

      fixes.push({
        id: 'fix-row-lengths',
        type: 'add_missing_header',
        description: `Format alignment: Pad mismatched rows with empty fields to match header length of ${headersList.length} columns.`,
        action: () => {
          const updatedRows = rowsList.map(row => {
            if (row.length < headersList.length) {
              return [...row, ...Array(headersList.length - row.length).fill('')];
            } else if (row.length > headersList.length) {
              return row.slice(0, headersList.length);
            }
            return row;
          });
          setRows(updatedRows);
        }
      });
    }

    // 2. Validate Headers
    const lowerHeaders = headersList.map(h => h.toLowerCase().trim());
    const required = ['manufacturer', 'mpn', 'sku', 'distributor-url'];
    
    required.forEach(req => {
      if (!lowerHeaders.includes(req)) {
        // Find close match
        let foundMatch: string | null = null;
        let originalIndex = -1;
        
        headersList.forEach((h, i) => {
          const close = findCloseMatch(h);
          if (close === req) {
            foundMatch = h;
            originalIndex = i;
          }
        });

        if (foundMatch !== null && originalIndex !== -1) {
          const fm = foundMatch as string;
          const oi = originalIndex as number;
          errors.push({
            type: 'error',
            message: `Misspelled required header: Found "${fm}" which looks like "${req}".`,
            field: fm,
            troubleshootingKey: 'headers'
          });

          fixes.push({
            id: `rename-${req}`,
            type: 'rename_header',
            description: `Auto-rename column "${fm}" to standard "${req}".`,
            action: () => {
              const updatedHeaders = [...headersList];
              updatedHeaders[oi] = req;
              setHeaders(updatedHeaders);
            }
          });
        } else {
          errors.push({
            type: 'error',
            message: `Missing required header: "${req}" is missing from the datafeed.`,
            troubleshootingKey: 'headers'
          });
        }
      }
    });

    // Check for unsupported/misspelled columns
    headersList.forEach((header, idx) => {
      const h = header.toLowerCase().trim();
      
      let isSupported = false;
      if (SUPPORTED_HEADERS.includes(h)) isSupported = true;
      else if (/^price-[a-z]{3}-\d+$/.test(h)) isSupported = true;
      else if (isUrlColumn(h)) isSupported = true;

      if (!isSupported) {
        const close = findCloseMatch(header);
        
        if (close) {
          errors.push({
            type: 'error',
            message: `Unsupported or misspelled header: "${header}". Did you mean "${close}"?`,
            field: header,
            troubleshootingKey: 'headers'
          });

          fixes.push({
            id: `rename-unsup-${header}`,
            type: 'rename_header',
            description: `Auto-correct column "${header}" to standard "${close}".`,
            action: () => {
              const updatedHeaders = [...headersList];
              updatedHeaders[idx] = close;
              setHeaders(updatedHeaders);
            }
          });
        } else {
          errors.push({
            type: 'warning',
            message: `Unsupported header: "${header}" will be ignored during import.`,
            field: header,
            troubleshootingKey: 'headers'
          });

          fixes.push({
            id: `remove-column-${header}`,
            type: 'rename_header',
            description: `Remove unsupported column "${header}" from import mapping.`,
            action: () => {
              const updatedHeaders = headersList.filter((_, i) => i !== idx);
              const updatedRows = rowsList.map(row => row.filter((_, i) => i !== idx));
              setHeaders(updatedHeaders);
              setRows(updatedRows);
            }
          });
        }
      }
    });

    // 3. Check URLs
    const urlIndices: { index: number; header: string }[] = [];
    headersList.forEach((h, i) => {
      if (isUrlColumn(h)) {
        urlIndices.push({ index: i, header: h });
      }
    });

    let invalidUrlCount = 0;
    const invalidUrlRows: { row: number; colIndex: number; header: string; val: string }[] = [];

    rowsList.forEach((row, rIdx) => {
      urlIndices.forEach(({ index, header }) => {
        const val = row[index];
        if (val && val.trim() !== '') {
          const trimmed = val.trim();
          if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
            invalidUrlCount++;
            invalidUrlRows.push({ row: rIdx + 2, colIndex: index, header, val: trimmed });
          }
        }
      });
    });

    if (invalidUrlCount > 0) {
      errors.push({
        type: 'error',
        message: `Invalid URLs: Found ${invalidUrlCount} URL(s) that do not start with http:// or https:// (e.g. Row ${invalidUrlRows[0].row}, column "${invalidUrlRows[0].header}").`,
        troubleshootingKey: 'urls'
      });

      fixes.push({
        id: 'fix-urls',
        type: 'add_url_prefix',
        description: `Auto-fix ${invalidUrlCount} URL(s) by prepending "https://" to entries that lack it.`,
        action: () => {
          const updatedRows = rowsList.map(row => {
            const newRow = [...row];
            urlIndices.forEach(({ index }) => {
              const val = newRow[index];
              if (val && val.trim() !== '') {
                const trimmed = val.trim();
                if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
                  newRow[index] = `https://${trimmed}`;
                }
              }
            });
            return newRow;
          });
          setRows(updatedRows);
        }
      });
    }

    setValidationErrors(errors);
    setAutoFixes(fixes);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const separator = file.name.endsWith('.tsv') ? '\t' : ',';
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        processRawData(content, separator, file.name);
      }
    };
    reader.readAsText(file);
  };

  const loadDemo = (type: 'csv' | 'tsv' | 'broken') => {
    const content = type === 'csv' ? DEMO_CSV_CONTENT : type === 'tsv' ? DEMO_TSV_CONTENT : DEMO_BROKEN_CONTENT;
    const separator = type === 'tsv' ? '\t' : ',';
    const name = type === 'csv' ? 'example_feed_file.csv' : type === 'tsv' ? 'example_feed_file.tsv' : 'broken_feed_file.csv';
    processRawData(content, separator, name);
  };

  const processRawData = (text: string, separator: string, name: string) => {
    setFileName(name);
    
    // Parse it immediately in the background
    const parsed = parseCSV(text, separator);
    if (parsed.length > 0) {
      const parsedHeaders = parsed[0];
      const parsedRows = parsed.slice(1).filter(r => r.length >= Math.min(3, parsedHeaders.length));
      
      setHeaders(parsedHeaders);
      setRows(parsedRows);
    }
    
    // Transition to partner selection before analyzing/validating
    setStep('partner-select');
  };

  const handleProceedToMapping = () => {
    const initialMappings: Record<string, { targetField: string; sampleValue: string; approved: boolean }> = {};
    
    const mpnIdx = headers.findIndex(h => h.toLowerCase() === 'mpn');
    const qtyIdx = headers.findIndex(h => h.toLowerCase() === 'quantity');
    const descIdx = headers.findIndex(h => h.toLowerCase() === 'description');
    const leadDaysIdx = headers.findIndex(h => h.toLowerCase() === 'factory-lead-days');
    const moqIdx = headers.findIndex(h => h.toLowerCase() === 'moq');
    const priceIdx = headers.findIndex(h => h.toLowerCase() === 'price-usd-1');
    const attrsIdx = headers.findIndex(h => h.toLowerCase() === 'attributes');
    const mfgIdx = headers.findIndex(h => h.toLowerCase() === 'manufacturer');
    const skuIdx = headers.findIndex(h => h.toLowerCase() === 'sku');
    const distUrlIdx = headers.findIndex(h => h.toLowerCase() === 'distributor-url');
    
    const sampleRow = rows[0] || [];
    
    if (mfgIdx !== -1) {
      initialMappings['manufacturer'] = { targetField: 'CatalogItem.manufacturer (Implicit)', sampleValue: sampleRow[mfgIdx] || '', approved: true };
    }
    if (mpnIdx !== -1) {
      initialMappings['mpn'] = { targetField: 'CatalogItem.mpn', sampleValue: sampleRow[mpnIdx] || '', approved: true };
    }
    if (skuIdx !== -1) {
      initialMappings['sku'] = { targetField: 'CatalogItem.sku (Tracking Reference)', sampleValue: sampleRow[skuIdx] || '', approved: true };
    }
    if (distUrlIdx !== -1) {
      initialMappings['distributor-url'] = { targetField: 'CatalogItem.distributorUrl (Direct Link)', sampleValue: sampleRow[distUrlIdx] || '', approved: true };
    }
    if (qtyIdx !== -1) {
      initialMappings['quantity'] = { targetField: 'CatalogItem.stock', sampleValue: sampleRow[qtyIdx] || '', approved: true };
    }
    if (descIdx !== -1) {
      initialMappings['description'] = { targetField: 'CatalogItem.desc', sampleValue: sampleRow[descIdx] || '', approved: true };
    }
    if (leadDaysIdx !== -1) {
      const leadVal = sampleRow[leadDaysIdx];
      const leadWeeks = leadVal ? Math.round(parseInt(leadVal) / 7) : 0;
      initialMappings['factory-lead-days'] = { targetField: 'CatalogItem.leadTime', sampleValue: `${leadVal} days (${leadWeeks} wks)`, approved: true };
    }
    if (moqIdx !== -1) {
      initialMappings['moq'] = { targetField: 'CatalogItem.moq', sampleValue: sampleRow[moqIdx] || '', approved: true };
    }
    if (priceIdx !== -1) {
      initialMappings['price-usd-1'] = { targetField: 'CatalogItem.price', sampleValue: `$${parseFloat(sampleRow[priceIdx]) || 0}`, approved: true };
    }
    if (attrsIdx !== -1 && sampleRow[attrsIdx]) {
      try {
        const attrsObj = JSON.parse(sampleRow[attrsIdx]);
        initialMappings['attributes (case_package)'] = { targetField: 'CatalogItem.package', sampleValue: attrsObj.case_package || 'SOIC', approved: false };
        initialMappings['attributes (rohs_compliance)'] = { targetField: 'CatalogItem.rohs', sampleValue: attrsObj.rohs_compliance === 'Y' ? 'Compliant' : 'Non-Compliant', approved: false };
        initialMappings['attributes (lifecycle_status)'] = { targetField: 'CatalogItem.lifecycle', sampleValue: attrsObj.lifecycle_status?.value || 'Active', approved: false };
      } catch (e) {
        initialMappings['attributes'] = { targetField: 'CatalogItem.package,rohs,lifecycle', sampleValue: 'Raw Attributes Object', approved: false };
      }
    }
    
    setMappings(initialMappings);
    
    const itemsToIngest = rows.map((row) => {
      const mpn = mpnIdx !== -1 ? row[mpnIdx] : 'UNKNOWN';
      const desc = descIdx !== -1 ? row[descIdx] : '';
      const stock = qtyIdx !== -1 ? parseInt(row[qtyIdx]) || 0 : 0;
      const leadTime = leadDaysIdx !== -1 ? Math.round((parseInt(row[leadDaysIdx]) || 0) / 7) : 0;
      const moq = moqIdx !== -1 ? parseInt(row[moqIdx]) || 1 : 1;
      const price = priceIdx !== -1 ? parseFloat(row[priceIdx]) || 0 : 0;
      
      let pkg = 'SMD';
      let rohs = true;
      let lifecycle = 'Active';
      
      if (attrsIdx !== -1 && row[attrsIdx]) {
        try {
          const a = JSON.parse(row[attrsIdx]);
          if (a.case_package) pkg = a.case_package;
          if (a.rohs_compliance) rohs = (a.rohs_compliance === 'Y' || a.rohs_compliance === 'yes' || a.rohs_compliance === 'compliant');
          if (a.lifecycle_status && a.lifecycle_status.value) {
            lifecycle = a.lifecycle_status.value;
            lifecycle = lifecycle.charAt(0).toUpperCase() + lifecycle.slice(1).toLowerCase();
          }
        } catch (e) {
          console.error("Attributes extraction failed", e);
        }
      }
      
      return { mpn, desc, stock, leadTime, moq, price, package: pkg, rohs, lifecycle };
    });
    
    setInjectedItems(itemsToIngest);
    setStep('mapping');
  };

  const handleConfirmIngest = () => {
    addCatalogItems(injectedItems);
    addActivityLog({
      message: `Data Ingestion complete: Added ${injectedItems.length} parts from "${fileName}"`,
      type: 'success',
      source: 'AI Ingestion Engine'
    });
    setStep('success');
  };

  const countPending = () => {
    return Object.values(mappings).filter(m => !m.approved).length;
  };

  const criticalErrors = validationErrors.filter(e => e.type === 'error');
  const warningErrors = validationErrors.filter(e => e.type === 'warning');

  const handleSelectError = (error: ValidationError) => {
    setActiveTroubleSection(error.troubleshootingKey);
  };

  const getPartnerScore = (partnerId: string) => {
    let penalty = 0;
    // Vary penalty weights slightly per partner for realism in demo
    if (partnerId === 'octopart') penalty = (criticalErrors.length * 18) + (warningErrors.length * 4);
    else if (partnerId === 'siliconexpert') penalty = (criticalErrors.length * 22) + (warningErrors.length * 6);
    else if (partnerId === 'avnet') penalty = (criticalErrors.length * 15) + (warningErrors.length * 5);
    else if (partnerId === 'digikey') penalty = (criticalErrors.length * 25) + (warningErrors.length * 3);
    else penalty = (criticalErrors.length * 20) + (warningErrors.length * 5);
    
    return Math.max(0, 100 - penalty);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
      {/* HEADER PROGRESS WIZARD */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>AI Ingestion Engine</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Validate, map and ingest supply-chain datafeeds</p>
        </div>
        
        {step !== 'integration-select' && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: step === 'upload' || step === 'api-config' || step === 'partner-select' || step === 'parsing' ? 'var(--accent-primary)' : 'rgba(59, 130, 246, 0.2)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
            <div style={{ width: '40px', height: '2px', background: 'var(--border-color)' }}></div>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: step === 'validation' ? 'var(--accent-primary)' : 'rgba(59, 130, 246, 0.2)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
            <div style={{ width: '40px', height: '2px', background: 'var(--border-color)' }}></div>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: step === 'mapping' ? 'var(--accent-primary)' : 'rgba(59, 130, 246, 0.2)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
          </div>
        )}
      </div>

      {/* INTEGRATION SELECT STEP */}
      {step === 'integration-select' && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Select Ingestion Source</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Choose how you want to bring your component data into Adesio Sync.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
            {/* Legacy File Upload */}
            <div 
              className="card table-row-hover" 
              onClick={() => {
                setIngestionFlow('file');
                setStep('upload');
              }}
              style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer', border: '1px solid var(--border-color)' }}
            >
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <FileType size={32} color="#3b82f6" />
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '12px' }}>Legacy / EDI Integration</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>Upload standard EDI (Electronic Data Interchange) or Web-EDI XML files. AI parses legacy B2B structures.</p>
            </div>

            {/* Modern Product API */}
            <div 
              className="card table-row-hover"
              onClick={() => {
                setIngestionFlow('api');
                setStep('api-config');
              }}
              style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer', border: '1px solid var(--border-color)' }}
            >
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Server size={32} color="#8b5cf6" />
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '12px' }}>Modern Product API</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>Configure Webhooks or GraphQL endpoints for real-time, programmatic data ingestion.</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* PARTNER SELECT STEP */}
      {step === 'partner-select' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
          className="card" style={{ padding: '32px', maxWidth: '800px', margin: '0 auto', width: '100%' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <button onClick={() => setStep(ingestionFlow === 'file' ? 'upload' : 'api-config')} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} /> Back
            </button>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Select Syndication Partners</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', marginLeft: '32px' }}>
            Choose which global partners you want to connect and route this payload to. Adesio Sync will automatically validate your data against their specific requirements.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              { id: 'octopart', name: 'Octopart', icon: <Link size={24} color="#3b82f6" /> },
              { id: 'siliconexpert', name: 'SiliconExpert', icon: <Database size={24} color="#10b981" /> },
              { id: 'avnet', name: 'Avnet', icon: <Server size={24} color="#f59e0b" /> },
              { id: 'digikey', name: 'DigiKey', icon: <Settings size={24} color="#8b5cf6" /> }
            ].map(p => (
              <div 
                key={p.id}
                onClick={() => setSelectedPartners(prev => prev.includes(p.id) ? prev.filter(x => x !== p.id) : [...prev, p.id])}
                style={{ 
                  padding: '20px', 
                  background: selectedPartners.includes(p.id) ? 'rgba(59, 130, 246, 0.05)' : 'rgba(255,255,255,0.02)', 
                  border: `2px solid ${selectedPartners.includes(p.id) ? 'var(--accent-primary)' : 'var(--border-color)'}`, 
                  borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--panel-bg)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {p.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-primary)' }}>{p.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Requires specific parametric data.</p>
                </div>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: `2px solid ${selectedPartners.includes(p.id) ? 'var(--accent-primary)' : 'var(--border-color)'}`, background: selectedPartners.includes(p.id) ? 'var(--accent-primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {selectedPartners.includes(p.id) && <Check size={14} color="white" strokeWidth={3} />}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              disabled={selectedPartners.length === 0}
              onClick={() => {
                setStep('parsing');
                setProgress(0);
                let p = 0;
                const interval = setInterval(() => {
                  p += 20;
                  if (p >= 100) {
                    setProgress(100);
                    clearInterval(interval);
                    setTimeout(() => {
                       setStep('validation');
                    }, 500);
                  } else {
                    setProgress(p);
                  }
                }, 400);
              }}
              style={{ 
                padding: '12px 32px', background: selectedPartners.length > 0 ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)', 
                color: selectedPartners.length > 0 ? 'white' : 'var(--text-secondary)', 
                border: 'none', borderRadius: '8px', fontWeight: 600, cursor: selectedPartners.length > 0 ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
              }}
            >
              Analyze Payload & Grade <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      )}

      {/* API CONNECTOR CONFIGURATION STEP */}
      {step === 'api-config' && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <button onClick={() => setStep('integration-select')} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} /> Back
            </button>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Modern Product API Connector</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT COLUMN: CONFIGURATION */}
            <div className="card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid var(--border-color)' }}>
              <div>
                <h4 style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Server size={18} color="var(--accent-primary)" /> API Gateway Settings
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                  Configure your webhook endpoints and authorize security keys.
                </p>
              </div>

              {/* ROUTE INPUT */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>API Ingestion Route (Endpoint)</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Globe size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px' }} />
                  <input 
                    type="text" 
                    value={apiRoute} 
                    onChange={(e) => setApiRoute(e.target.value)}
                    style={{ 
                      width: '100%', padding: '12px 12px 12px 36px', background: 'rgba(0,0,0,0.2)', 
                      border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)',
                      fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s'
                    }}
                    placeholder="https://api.domain.com/v1/ingest"
                  />
                </div>
              </div>

              {/* SECRET ID */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Secret ID (Client Identifier)</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '12px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }}></span>
                    Active
                  </div>
                </div>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Key size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px' }} />
                  <input 
                    type="text" 
                    value={secretId} 
                    onChange={(e) => setSecretId(e.target.value)}
                    style={{ 
                      width: '100%', padding: '12px 12px 12px 36px', background: 'rgba(0,0,0,0.2)', 
                      border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)',
                      fontSize: '0.9rem', outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* SECRET KEY */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Secret Key (HMAC Signing Token)</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600, color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '12px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }}></span>
                    Active / Signed
                  </div>
                </div>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Lock size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px' }} />
                  <input 
                    type={showSecretKey ? "text" : "password"} 
                    value={secretKey} 
                    onChange={(e) => setSecretKey(e.target.value)}
                    style={{ 
                      width: '100%', padding: '12px 40px 12px 36px', background: 'rgba(0,0,0,0.2)', 
                      border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)',
                      fontSize: '0.9rem', outline: 'none'
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowSecretKey(!showSecretKey)}
                    style={{ 
                      position: 'absolute', right: '12px', background: 'transparent', border: 'none', 
                      color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' 
                    }}
                  >
                    {showSecretKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* PAYLOAD TYPE SELECTOR */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Simulation Payload Type</label>
                <div style={{ display: 'flex', background: 'rgba(0,0,0,0.15)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <button
                    type="button"
                    onClick={() => setApiPayloadType('clean')}
                    style={{
                      flex: 1, padding: '8px', border: 'none', borderRadius: '6px', cursor: 'pointer',
                      background: apiPayloadType === 'clean' ? 'var(--accent-primary)' : 'transparent',
                      color: 'white', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s'
                    }}
                  >
                    Clean Product Feed
                  </button>
                  <button
                    type="button"
                    onClick={() => setApiPayloadType('broken')}
                    style={{
                      flex: 1, padding: '8px', borderRadius: '6px', cursor: 'pointer',
                      background: apiPayloadType === 'broken' ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
                      color: apiPayloadType === 'broken' ? '#ef4444' : 'var(--text-secondary)', 
                      fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s',
                      border: apiPayloadType === 'broken' ? '1px solid rgba(239, 68, 68, 0.4)' : 'none'
                    }}
                  >
                    Broken Payload (Validate Demo)
                  </button>
                </div>
              </div>

              {/* TEST CONNECTION ACTION BUTTON */}
              <button
                type="button"
                disabled={isTestingApi}
                onClick={() => {
                  setIsTestingApi(true);
                  setTimeout(() => {
                    const text = apiPayloadType === 'clean' ? DEMO_CSV_CONTENT : DEMO_BROKEN_CONTENT;
                    const separator = ',';
                    const name = apiPayloadType === 'clean' ? 'api_push_feed.csv' : 'api_broken_feed.csv';
                    processRawData(text, separator, name);
                    setIsTestingApi(false);
                    
                    addActivityLog({
                      message: `API Sync successfully fetched raw product catalog payload via gateway route "${apiRoute}"`,
                      type: 'success',
                      source: 'Modern API Connector'
                    });
                  }, 1200);
                }}
                style={{
                  width: '100%', padding: '14px', background: 'linear-gradient(135deg, #6c5ce7 0%, #3b82f6 100%)',
                  color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: isTestingApi ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '0.95rem',
                  boxShadow: '0 4px 12px rgba(108, 92, 231, 0.2)', transition: 'all 0.2s', marginTop: '8px'
                }}
              >
                {isTestingApi ? (
                  <>
                    <RefreshCw size={18} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                    Authenticating & Fetching...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} /> Test Connection & Fetch Payload
                  </>
                )}
              </button>
            </div>

            {/* RIGHT COLUMN: CODE STREAM & SECURITY DETAILS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* CODE STREAM CARD */}
              <div className="card" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.15)' }}>
                <h4 style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
                  Webhook Request Stream Inspector
                </h4>
                
                <pre style={{ 
                  margin: 0, padding: '16px', background: '#0c0f17', border: '1px solid rgba(255,255,255,0.05)', 
                  borderRadius: '8px', color: '#a5b4fc', fontSize: '0.8rem', fontFamily: 'monospace', 
                  overflowX: 'auto', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
                  lineHeight: '1.6'
                }}>
                  <div><span style={{ color: '#f43f5e', fontWeight: 'bold' }}>POST</span> {apiRoute.replace('https://api.adesioproxy.com', '')} HTTP/1.1</div>
                  <div><span style={{ color: '#93c5fd' }}>Host:</span> api.adesioproxy.com</div>
                  <div><span style={{ color: '#93c5fd' }}>X-Adesio-Secret-ID:</span> {secretId}</div>
                  <div><span style={{ color: '#93c5fd' }}>X-Adesio-Signature:</span> sha256=a8f4c2b97f3e8b0...</div>
                  <div><span style={{ color: '#93c5fd' }}>Content-Type:</span> application/json</div>
                  <div style={{ margin: '8px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}></div>
                  <div>{"{"}</div>
                  <div>  <span style={{ color: '#a7f3d0' }}>"connector_type"</span>: "Modern API Ingestion",</div>
                  <div>  <span style={{ color: '#a7f3d0' }}>"route"</span>: "{apiRoute}",</div>
                  <div>  <span style={{ color: '#a7f3d0' }}>"secret_status"</span>: <span style={{ color: '#34d399', fontWeight: 'bold' }}>"ACTIVE"</span>,</div>
                  <div>  <span style={{ color: '#a7f3d0' }}>"payload_profile"</span>: "{apiPayloadType === 'clean' ? 'PRODUCTION_CLEAN' : 'SANDBOX_DEBUG_ERRORS'}",</div>
                  <div>  <span style={{ color: '#a7f3d0' }}>"timestamp"</span>: "{new Date().toISOString().substring(0, 19) + 'Z'}"</div>
                  <div>{"}"}</div>
                </pre>
              </div>

              {/* SECURITY DETAILS CARD */}
              <div className="card" style={{ padding: '20px', border: '1px solid rgba(16, 185, 129, 0.15)', background: 'linear-gradient(135deg, rgba(16,185,129,0.02) 0%, rgba(59,130,246,0.02) 100%)' }}>
                <h5 style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Lock size={16} color="#10b981" /> HMAC-SHA256 Payload Security
                </h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5' }}>
                  Adesio Sync uses cryptographic Hashed Message Authentication Codes (HMAC) signed using your <strong>Active Secret Key</strong>. This guarantees message authenticity and absolute data integrity, preventing man-in-the-middle attacks.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* UPLOAD STEP */}
      {step === 'upload' && (
        <div style={{ display: 'flex', gap: '24px', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <button onClick={() => setStep('integration-select')} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} /> Back
            </button>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Legacy / EDI Integration</h3>
          </div>
          
          <div style={{ display: 'flex', gap: '24px' }}>
            {/* DRAG & DROP ZONE */}
            <motion.div 
              className="card"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
            style={{ 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
              padding: '60px 20px', borderStyle: 'dashed', borderWidth: '2px', 
              borderColor: isDragging ? 'var(--accent-primary)' : 'var(--border-color)',
              backgroundColor: isDragging ? 'rgba(59, 130, 246, 0.05)' : 'var(--panel-bg)',
              transition: 'all 0.3s ease', flex: '1 1 500px'
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              id="file-picker-input" 
              accept=".csv,.tsv" 
              style={{ display: 'none' }} 
              onChange={handleFileChange} 
            />
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <UploadCloud size={40} color="var(--accent-primary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>Drag & Drop ERP Export</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', textAlign: 'center' }}>
              Upload raw .csv or .tsv legacy files.<br/>
              Our LLM will automatically parse and validate your headers and data.
            </p>
            <button 
              type="button"
              style={{ 
                padding: '12px 24px', background: 'var(--accent-primary)', color: 'white', 
                border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '8px'
              }}
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById('file-picker-input')?.click();
              }}
            >
              <FileType size={18} /> Browse Files
            </button>
          </motion.div>

          {/* QUICK PICK DEMO UTILITY */}
          <motion.div 
            className="card"
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
            style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(59,130,246,0.03) 0%, rgba(108,92,231,0.03) 100%)', border: '1px solid rgba(59,130,246,0.15)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <Sparkles size={20} color="var(--accent-primary)" />
              <h4 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Quick-Load Demo Feed Examples</h4>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
              Instantly test the AI Ingestion and Standards Validation engine with clean or broken workspace feed formats.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                onClick={(e) => { e.stopPropagation(); loadDemo('csv'); }}
                className="btn-demo-pick"
                style={{
                  padding: '10px 18px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer',
                  fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
                }}
              >
                <FileType size={16} color="#6c5ce7" /> Load example_feed_file.csv
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); loadDemo('tsv'); }}
                className="btn-demo-pick"
                style={{
                  padding: '10px 18px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer',
                  fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
                }}
              >
                <FileType size={16} color="#10b981" /> Load example_feed_file.tsv
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); loadDemo('broken'); }}
                className="btn-demo-pick"
                style={{
                  padding: '10px 18px', background: 'rgba(239, 68, 68, 0.05)', color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '6px', cursor: 'pointer',
                  fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
                }}
              >
                <Sparkles size={16} color="#ef4444" /> Load a Broken Feed (For Demo)
              </button>
            </div>
          </motion.div>
        </div>
        </div>
      )}

      {/* PARSING STEP */}
      {step === 'parsing' && (
        <motion.div 
          className="card"
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
          style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
            padding: '60px 20px'
          }}
        >
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(108, 92, 231, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
              <Sparkles size={40} color="var(--color-cpi)" />
            </motion.div>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>AI Parsing ERP Data</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', textAlign: 'center' }}>
            Extracting parametric features and mapping headers for <strong>"{fileName}"</strong>...
          </p>
          <div style={{ width: '100%', maxWidth: '400px', height: '8px', background: 'var(--panel-bg)', border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
            <motion.div 
              style={{ height: '100%', background: 'var(--accent-primary)' }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.3 }}
            />
          </div>
          <div style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>{progress}% Complete</div>
        </motion.div>
      )}

      {/* VALIDATION STEP (STANDARDS INSPECTOR) */}
      {step === 'validation' && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => { setStep('integration-select'); setRows([]); setHeaders([]); setSelectedPartners([]); }} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} /> Start Over
            </button>
          </div>
          {/* INSPECTION STATUS BANNER */}
          <div 
            style={{ 
              padding: '20px 24px', 
              borderRadius: '12px', 
              background: criticalErrors.length > 0 ? 'rgba(239, 68, 68, 0.08)' : 'rgba(16, 185, 129, 0.08)',
              border: criticalErrors.length > 0 ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                width: '48px', height: '48px', borderRadius: '50%', 
                background: criticalErrors.length > 0 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: criticalErrors.length > 0 ? '#ef4444' : '#10b981'
              }}>
                {criticalErrors.length > 0 ? <XCircle size={26} /> : <CheckCircle size={26} />}
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {criticalErrors.length > 0 ? 'Syndication Rejection: Critical Errors Detected' : `Partner Grading: ${selectedPartners.length > 0 ? selectedPartners.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(', ') : 'Standards'} Check Passed`}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '2px' }}>
                  {criticalErrors.length > 0 
                    ? `Found ${criticalErrors.length} critical error(s) and ${warningErrors.length} warning(s) that must be resolved to syndicate to your selected partners.` 
                    : 'Your feed matches all selected partner data structure requirements perfectly.'}
                </p>
              </div>
            </div>
            
            {criticalErrors.length === 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 600, fontSize: '0.95rem' }}>
                <Check size={18} /> Validated for {selectedPartners.length} partner(s)
              </div>
            )}
          </div>
          
          {/* PARTNER COMPATIBILITY SCORES */}
          {selectedPartners.length > 0 && (
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {selectedPartners.map(p => {
                const score = getPartnerScore(p);
                const isEligible = score >= 50;
                return (
                  <div key={p} style={{ 
                    flex: '1 1 200px',
                    padding: '16px', 
                    background: 'var(--panel-bg)', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)', textTransform: 'capitalize' }}>{p}</span>
                      <span style={{ 
                        fontWeight: 'bold', 
                        color: isEligible ? (score >= 90 ? '#10b981' : '#f59e0b') : '#ef4444' 
                      }}>
                        {score}%
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${score}%`, 
                        height: '100%', 
                        background: isEligible ? (score >= 90 ? '#10b981' : '#f59e0b') : '#ef4444' 
                      }}></div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {isEligible ? 'Eligible for Syndication' : 'Minimum 50% required'}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TWO COLUMN INSPECTOR LAYOUT */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {/* LEFT COLUMN: CRITICAL ERRORS & AI RESOLVERS */}
            <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>AI Standards Inspector</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>File: <code>{fileName}</code></span>
                </div>

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {validationErrors.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '30px 20px', color: 'var(--text-secondary)' }}>
                      <CheckCircle size={40} color="#10b981" style={{ marginBottom: '16px', opacity: 0.8 }} />
                      <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)' }}>No validation anomalies found.</p>
                      <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>All headers correspond to official spec, row dimensions are identical, and URLs are securely prefixed.</p>
                    </div>
                  ) : (
                    validationErrors.map((err, idx) => (
                      <div 
                        key={idx}
                        onClick={() => handleSelectError(err)}
                        style={{ 
                          padding: '16px', 
                          borderRadius: '8px', 
                          background: err.type === 'error' ? 'rgba(239, 68, 68, 0.02)' : 'rgba(245, 158, 11, 0.02)',
                          border: err.type === 'error' ? '1px solid rgba(239, 68, 68, 0.15)' : '1px solid rgba(245, 158, 11, 0.15)',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px'
                        }}
                        className="error-card-hover"
                      >
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                          {err.type === 'error' ? (
                            <XCircle size={18} color="#ef4444" style={{ marginTop: '2px', flexShrink: 0 }} />
                          ) : (
                            <AlertTriangle size={18} color="#f59e0b" style={{ marginTop: '2px', flexShrink: 0 }} />
                          )}
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                              {err.type === 'error' ? 'Critical Rule Violation' : 'Mapping Warning'}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                              {err.message}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* AI SMART RESOLUTIONS */}
              {autoFixes.length > 0 && (
                <div className="card" style={{ background: 'linear-gradient(135deg, rgba(108,92,231,0.05) 0%, rgba(59,130,246,0.05) 100%)', border: '1px solid rgba(108,92,231,0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <Sparkles size={20} color="var(--accent-primary)" />
                    <h4 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>AI Smart Resolutions</h4>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>
                    We've scanned the datafeed violations against your selected partner specifications and compiled automated fixes. Click to apply them immediately.
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {autoFixes.map(fix => (
                      <div 
                        key={fix.id}
                        style={{ 
                          padding: '12px 16px', background: 'rgba(255,255,255,0.02)', 
                          border: '1px solid var(--border-color)', borderRadius: '8px',
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          gap: '12px'
                        }}
                      >
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                          {fix.description}
                        </div>
                        <button 
                          onClick={fix.action}
                          style={{
                            padding: '8px 12px', background: 'var(--accent-primary)', color: 'white',
                            border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer',
                            fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px',
                            flexShrink: 0
                          }}
                        >
                          <Sparkles size={12} /> Apply Fix
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: ADVANCED TROUBLESHOOTING ACCORDION */}
            <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                  <HelpCircle size={20} color="var(--accent-primary)" />
                  <h4 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Advanced Troubleshooting</h4>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    {
                      key: 'headers',
                      title: 'Check your headers',
                      content: 'Often times a slip of the hand can result in a misspelled header. Our system only processes the supported headers, so misspellings will cause the datafeed to fail. Missing or incorrectly placed hyphens are another common culprit!'
                    },
                    {
                      key: 'formatting',
                      title: 'Check your formatting',
                      content: 'Common formatting problems include data values that contain improperly escaped double quotation marks (") and data values that are separated by unsupported delimiter characters (semi-colons and greater-than/less-than signs are commonly misused).'
                    },
                    {
                      key: 'urls',
                      title: 'Check your URLs',
                      content: 'Make sure that your URLs begin with either http:// or https:// and that they point to part-specific images, datasheets, or pages on your website.'
                    },
                    {
                      key: 'values',
                      title: 'Check your data values',
                      content: 'Make sure that all of your parts have valid and accurate data values that correspond to all of the required headers. Parts that do not have values for the required headers will not be shown.'
                    },
                    {
                      key: 'extraneous',
                      title: 'Check for extraneous information',
                      content: 'Make sure that the header row is the first row in the file and that there are no random or "nonsense" characters. These may confuse our parser, causing it to misread your data and fail.'
                    },
                    {
                      key: 'listings',
                      title: 'Check your listings',
                      content: 'Look for duplicate listings and missing information. If you find duplicate lines, please delete the duplicates.'
                    }
                  ].map(section => {
                    const isSelected = activeTroubleSection === section.key;
                    return (
                      <div 
                        key={section.key} 
                        style={{ 
                          border: '1px solid var(--border-color)', 
                          borderRadius: '8px', 
                          overflow: 'hidden',
                          backgroundColor: isSelected ? 'rgba(108, 92, 231, 0.02)' : 'transparent',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <button
                          onClick={() => setActiveTroubleSection(isSelected ? null : section.key)}
                          style={{ 
                            width: '100%', 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            padding: '12px 16px', 
                            background: 'transparent', 
                            border: 'none', 
                            color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)', 
                            fontWeight: 600, 
                            textAlign: 'left', 
                            cursor: 'pointer' 
                          }}
                        >
                          <span>{section.title}</span>
                          {isSelected ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div style={{ padding: '0 16px 16px 16px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                                {section.content}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Mail size={20} color="var(--text-secondary)" style={{ flexShrink: 0 }} />
                  <div style={{ fontSize: '0.85rem' }}>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Still having trouble submitting?</div>
                    <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Email us at <a href="mailto:support@adesio.com" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>support@adesio.com</a> for help.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LOWER ACTION BAR */}
          <div 
            style={{ 
              padding: '16px 24px', 
              background: 'rgba(0,0,0,0.2)', 
              borderRadius: '12px', 
              border: '1px solid var(--border-color)',
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}
          >
            <button 
              onClick={() => setStep('upload')}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <RefreshCw size={14} /> Start Over & Re-upload
            </button>
            
            <button 
              onClick={handleProceedToMapping}
              disabled={criticalErrors.length > 0}
              style={{ 
                padding: '12px 24px', 
                background: criticalErrors.length > 0 ? 'rgba(255,255,255,0.05)' : 'var(--accent-primary)', 
                color: criticalErrors.length > 0 ? 'var(--text-secondary)' : 'white', 
                border: 'none', borderRadius: '8px', fontWeight: 600, 
                cursor: criticalErrors.length > 0 ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', gap: '8px',
                transition: 'all 0.2s',
                boxShadow: criticalErrors.length > 0 ? 'none' : '0 4px 12px rgba(108, 92, 231, 0.2)'
              }}
            >
              Proceed to Schema Mapper <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      )}

      {/* MAPPING STEP */}
      {step === 'mapping' && (
        <motion.div 
          className="card" style={{ padding: '0', overflow: 'hidden' }}
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
        >
          <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button onClick={() => { setStep('integration-select'); setRows([]); setHeaders([]); setSelectedPartners([]); }} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} /> Start Over
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Sparkles size={24} color="var(--accent-primary)" />
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>AI Auto-Mapping Review</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Parsed <strong>{rows.length} parts</strong> from <code>{fileName}</code></span>
                </div>
              </div>
            </div>
            {countPending() > 0 ? (
              <span className="badge badge-yellow">{countPending()} Needs Review</span>
            ) : (
              <span className="badge badge-green">All Mappings Verified</span>
            )}
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
                <th style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>YOUR FEED COLUMN</th>
                <th style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>AI SUGGESTION</th>
                <th style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>SAMPLE VALUE (ROW 1)</th>
                <th style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.85rem' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(mappings).map(([colName, mapInfo]) => (
                <tr key={colName} style={{ borderBottom: '1px solid var(--border-color)', background: !mapInfo.approved ? 'rgba(245, 158, 11, 0.03)' : 'transparent' }}>
                  <td style={{ padding: '16px 24px', fontWeight: 500 }} className="font-mono text-sm">{colName}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-primary)', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
                      {mapInfo.targetField}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    "{mapInfo.sampleValue}"
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    {mapInfo.approved ? (
                      <span className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}><CheckCircle size={14}/> Approved</span>
                    ) : (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={() => setMappings(prev => ({ ...prev, [colName]: { ...prev[colName], approved: true } }))} 
                          style={{ background: 'transparent', border: '1px solid #10b981', color: '#10b981', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
                        >
                          Approve
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div style={{ padding: '20px 24px', background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button 
              onClick={() => setStep('validation')}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <RefreshCw size={14} /> Back to Validation Report
            </button>
            <button 
              onClick={handleConfirmIngest}
              style={{ 
                padding: '12px 24px', background: 'var(--accent-primary)', color: 'white', 
                border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '8px'
              }}>
              Confirm & Ingest <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      )}

      {/* SUCCESS STEP */}
      {step === 'success' && (
        <motion.div 
          className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center' }}
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
        >
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <CheckCircle size={40} color="#10b981" />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '8px' }}>Ingestion Complete</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '500px' }}>
            Successfully validated and processed <strong>{injectedItems.length} components</strong> from <code>{fileName}</code>, extracted all parametric specs, and syndicated updates to active distributors.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button 
              onClick={() => setStep('upload')}
              style={{ 
                padding: '12px 24px', background: 'transparent', color: 'var(--text-primary)', 
                border: '1px solid var(--border-color)', borderRadius: '8px', fontWeight: 600, cursor: 'pointer'
              }}>
              Upload Another
            </button>
            <button 
              onClick={() => {
                window.dispatchEvent(new CustomEvent('navigate', { detail: 'catalog' }));
              }}
              style={{ 
                padding: '12px 24px', background: 'var(--accent-primary)', color: 'white', 
                border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer'
              }}>
              Go to Catalog Manager
            </button>
          </div>
        </motion.div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .btn-demo-pick:hover {
          background-color: rgba(255,255,255,0.1) !important;
          border-color: var(--accent-primary) !important;
        }
        .error-card-hover:hover {
          background-color: rgba(255, 255, 255, 0.04) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
        }
      `}} />
    </div>
  );
}
