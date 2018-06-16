var factory = getFactory();
var namespace = 'org.acme.ClinicalTrial';

/**
 * PhaseOneTrail transaction processor function.
 * @param {org.acme.ClinicalTrial.PhaseOneTrail} tx The phase one clinical trial transaction instance.
 * @transaction
 */

 async function PhaseOneTrail(tx) {
 	if(tx.drug.isApproved == false || tx.drug.isRegistered == false) {
 		throw new Error("This drug is neither registered or approved.");
 	}

 	const phaseone = factory.newConcept(namespace, 'PhaseOne');
 	phaseone.startdate = tx.startdate;
 	phaseone.enddate = tx.enddate;
 	phaseone.volunteers = tx.volunteers;
 	phaseone.purpose = tx.purpose;
 	phaseone.dosage = tx.dosage;

 	tx.drug.p1 = phaseone;

 	let assetRegistry = await getAssetRegistry('org.acme.ClinicalTrial.Drug');
    await assetRegistry.update(tx.drug);
 }

 /**
 * PhaseTwoTrail transaction processor function.
 * @param {org.acme.ClinicalTrial.PhaseTwoTrail} tx The phase two clinical trial transaction instance.
 * @transaction
 */

 async function PhaseTwoTrail(tx) {
 	if(tx.drug.p1.isSuccess == false) {
 		throw new Error("Phase one of clinical trial is unsuccessful. Could not proceed to phase two. Please check with your Investigator.");
 	}

 	const phasetwo = factory.newConcept(namespace, 'PhaseTwo');
 	phasetwo.startdate = tx.startdate;
 	phasetwo.enddate = tx.enddate;
 	phasetwo.volunteers = tx.volunteers;
 	phasetwo.purpose = tx.purpose;
 	phasetwo.dosage = tx.dosage;

 	tx.drug.p2 = phasetwo;

 	let assetRegistry = await getAssetRegistry('org.acme.ClinicalTrial.Drug');
    await assetRegistry.update(tx.drug);
 }

 /**
 * PhaseThreeTrail transaction processor function.
 * @param {org.acme.ClinicalTrial.PhaseThreeTrail} tx The phase three clinical trial transaction instance.
 * @transaction
 */

 async function PhaseThreeTrail(tx) {
 	if(tx.drug.p2.isSuccess == false) {
 		throw new Error("Phase two of clinical trial is unsuccessful. Please check with your Investigator.");
 	}

 	const phasethree = factory.newConcept(namespace, 'PhaseThree');
 	phasethree.startdate = tx.startdate;
 	phasethree.enddate = tx.enddate;
 	phasethree.volunteers = tx.volunteers;
 	phasethree.purpose = tx.purpose;
 	phasethree.dosage = tx.dosage;

 	tx.drug.p3 = phasethree;

 	let assetRegistry = await getAssetRegistry('org.acme.ClinicalTrial.Drug');
    await assetRegistry.update(tx.drug);
 }