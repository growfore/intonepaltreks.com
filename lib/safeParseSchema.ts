export function safeParseSchema(schema: string | undefined | null) {
  if (!schema) return null;

  // Step 1: Try parsing JSON
  let parsed: any;
  try {
    parsed = JSON.parse(schema);
  } catch {
    return null; // Not valid JSON at all
  }

  // Step 2: Validate basic schema.org structure
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return null; // Must be an object
  }

  if (!parsed["@context"] || !parsed["@type"]) {
    return null; // Must have @context and @type
  }

  // Step 3: @context must reference schema.org
  const context = parsed["@context"];
  if (typeof context !== "string" || !context.includes("schema.org")) {
    return null;
  }

  // Step 4: @type must be a non-empty string
  if (typeof parsed["@type"] !== "string" || parsed["@type"].trim() === "") {
    return null;
  }

  return parsed; // ✅ Valid schema.org structure
}
